import { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../../Firebase/firebaseConfig";

export default function PlaceForYouEdit() {
  const [formData, setFormData] = useState({
    titulo: "Estamos completos en Cristo...",
    subtitulo: "así como en Cristo",
    textoBoton: "HAZTE MIEMBRO",
    mensaje: "Un lugar para ti"
  });
  
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = async () => {
  try {
    let imageUrl = imagenPreview;

    if (imagenPreview?.startsWith("data:")) {
      const blob = await (await fetch(imagenPreview)).blob();
      const imageRef = ref(storage, `heroSections/${Date.now()}.jpg`);
      const snapshot = await uploadBytes(imageRef, blob);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    await setDoc(doc(db, "PlaceForYouEdit", "contenido"), {
      ...formData,
      imagen: imageUrl || "",
      actualizadoEn: new Date()
    });

    alert("Contenido actualizado correctamente.");
  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Hubo un error al actualizar los datos.");
  }
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const docRef = doc(db, "PlaceForYouEdit", "contenido");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          titulo: data.titulo || "",
          subtitulo: data.subtitulo || "",
          textoBoton: data.textoBoton || "",
          mensaje: data.mensaje || "",
        });
        if (data.imagen) {
          setImagenPreview(data.imagen);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  fetchData();
}, []);




  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sección del formulario */}
      <div className="w-full md:w-1/2 p-8 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Editor de Contenido</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje Superior</label>
            <input
              type="text"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título Principal</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <input
              type="text"
              name="subtitulo"
              value={formData.subtitulo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texto del Botón</label>
            <input
              type="text"
              name="textoBoton"
              value={formData.textoBoton}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen (Opcional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          
          <button 
            type="button"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium"
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
        </div>
      </div>
      
      {/* Sección de vista previa */}
      <div className="w-full md:w-1/2 p-8 bg-gray-200 flex items-center justify-center">
        <div className="w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Vista Previa:</h3>
          
          {/* Este es el componente que me pasaste, adaptado para mostrar los datos del formulario */}
          <div className="relative h-96 bg-gray-900 overflow-hidden shadow-xl rounded-lg">
            <div className="absolute inset-0 flex">
              {/* Left side: Image */}
              <div className="w-1/2 relative">
                <div className="absolute inset-0 bg-black opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4">
                    {imagenPreview ? (
                      <img
                        src={imagenPreview}
                        alt="Imagen personalizada"
                        className="max-w-full h-auto"
                      />
                    ) : (
                      <img
                        src="/api/placeholder/600/400"
                        alt="Manos en oración sobre Biblia abierta"
                        className="max-w-full h-auto"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Right side: Text */}
              <div className="w-1/2 flex items-center justify-center text-white p-6">
                <div className="text-right">
                  <p className="text-lg italic text-gray-300 mb-4">{formData.mensaje}</p>
                  <h1 className="text-3xl font-bold mb-2">{formData.titulo}</h1>
                  <h2 className="text-2xl mb-6">{formData.subtitulo}</h2>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full font-bold">
                    {formData.textoBoton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}