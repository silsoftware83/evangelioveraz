import React, { useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../Firebase/firebaseConfig';

const QuoteEditor = () => {
  const DOC_ID = 'aboutQuote'; // ID fijo, aunque sea la primera vez
  const COLLECTION = 'quotes';

  const [formData, setFormData] = useState({
    quote: '',
    author: '',
    role: '',
    imageUrl: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar datos existentes si hay
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const docRef = doc(db, COLLECTION, DOC_ID);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          const data = snapshot.data();
          setFormData({
            quote: data.quote || '',
            author: data.author || '',
            role: data.role || '',
            imageUrl: data.imageUrl || '',
          });
          setImagePreview(data.imageUrl || '');
        }
      } catch (err) {
        console.error('Error al cargar cita:', err);
      }
    };

    fetchQuote();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        const storageRef = ref(storage, `quoteBackgrounds/${DOC_ID}-${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        finalImageUrl = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, COLLECTION, DOC_ID), {
        quote: formData.quote,
        author: formData.author,
        role: formData.role,
        imageUrl: finalImageUrl,
        updatedAt: new Date(),
      });

      alert('Cita guardada correctamente.');
    } catch (err) {
      console.error(err);
      alert('Hubo un error al guardar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col md:flex-row gap-6">
      {/* Editor */}
      <div className="w-full md:w-1/2 bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Editar Cita</h2>

        <label className="block mb-2 font-medium">Cita</label>
        <textarea
          name="quote"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          rows={3}
          value={formData.quote}
          onChange={handleInputChange}
        />

        <label className="block mb-2 font-medium">Autor</label>
        <input
          name="author"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={formData.author}
          onChange={handleInputChange}
        />

        <label className="block mb-2 font-medium">Rol</label>
        <input
          name="role"
          className="w-full border border-gray-300 rounded p-2 mb-4"
          value={formData.role}
          onChange={handleInputChange}
        />

        <label className="block mb-2 font-medium">Imagen de fondo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>

      {/* Vista previa */}
      <div className="w-full md:w-1/2 relative bg-black rounded overflow-hidden shadow">
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Fondo"
            className="w-full h-full object-cover absolute opacity-40"
          />
        ) : (
          <div className="absolute w-full h-full bg-gray-800 opacity-40" />
        )}

        <div className="relative z-10 flex items-center justify-center h-full text-center px-6 py-12">
          <div className="text-white">
            <p className="text-xl md:text-2xl font-bold mb-4">“{formData.quote}”</p>
            <p className="text-base font-semibold">{formData.author}</p>
            <p className="text-sm italic">{formData.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteEditor;
