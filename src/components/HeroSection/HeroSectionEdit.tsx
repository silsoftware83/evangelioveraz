import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { Plus, Upload, Palette, Trash } from "lucide-react";
import { HeroSectionProps } from "../../types/HeroSection";
import { useHeroSections } from "../../hooks/useHeroSections";

import { addDoc, collection, doc, updateDoc, writeBatch } from "firebase/firestore";
import { ref as storageRef, uploadBytes, getDownloadURL,deleteObject } from "firebase/storage";
import { storage, db } from "../../Firebase/firebaseConfig"; // Asegúrate de tener configurado Firebase Storage y Firestore
import { deletePostWithImage } from "../../firebaseFunctions";


export const HeroSectionEdit = () => {

  const {heroSections} = useHeroSections();
  const [bannerItems, setBannerItems] = useState<HeroSectionProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingKey, setUpdatingKey] = useState<Number | null>(null);

  const handleInputChange = (index: number, field: keyof HeroSectionProps, value: string) => {
    const updatedItems = [...bannerItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setBannerItems(updatedItems);
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Crea una URL local para vista previa
      const localUrl = URL.createObjectURL(file);
      const updatedItems = [...bannerItems];
      updatedItems[index] = { ...updatedItems[index], url: localUrl, file }; // se guarda el File
      setBannerItems(updatedItems);
    }
  };

  const handleSave = async(index: number) => {
    setUpdatingKey(index);
    setLoading(true);
    try {
      const updatedItems = [...bannerItems];
      const item = updatedItems[index];
  
      let imageUrl = item.url;
      const previousImageUrl = item.url;
  
      // Si se seleccionó un nuevo archivo
      if (item.file) {
        // Subir nueva imagen
        const fileRef = storageRef(storage, `heroSections/${item.id || Date.now()}_${item.file.name}`);
        await uploadBytes(fileRef, item.file);
        imageUrl = await getDownloadURL(fileRef);
  
        // Borrar la imagen anterior si existe y es diferente
        if (previousImageUrl && previousImageUrl !== imageUrl) {
          try {
            const prevPath = new URL(previousImageUrl).pathname.split("/o/")[1].split("?")[0]; // path en storage
            const prevRef = storageRef(storage, decodeURIComponent(prevPath));
            await deleteObject(prevRef);
            console.log("Imagen anterior eliminada.");
          } catch (deleteError) {
            console.warn("No se pudo eliminar la imagen anterior:", deleteError);
          }
        }
      }
  
      const dataToSave = {
        title: item.title || "",
        titleColor: item.titleColor || "#000000",
        subtitle: item.subtitle || "",
        subtitleColor: item.subtitleColor || "#000000",
        description: item.description || "",
        descriptionColor: item.descriptionColor || "#000000",
        buttonText: item.buttonText || "",
        buttonTextColor: item.buttonTextColor || "#FFFFFF",
        url: imageUrl,
        updatedAt: new Date(),
      };
  
      if (item.id) {
        const docRef = doc(db, "HeroSections", item.id);
        await updateDoc(docRef, dataToSave);
        console.log("Documento actualizado:", item.id);
      } else {
        const docRef = await addDoc(collection(db, "HeroSections"), {
          ...dataToSave,
          createdAt: new Date(),
        });
        updatedItems[index].id = docRef.id;
        console.log("Documento creado:", docRef.id);
      }
  
      // Limpiar archivo local y actualizar el estado
      updatedItems[index].file = undefined;
      updatedItems[index].url = imageUrl;
      setBannerItems(updatedItems);
    } catch (error) {
      console.error("Error al guardar item:", error);
    }
    setLoading(false)
    setUpdatingKey(null);
  };

  const handleAddItem = () => {
    const newItem: HeroSectionProps = {
      subtitle: "",
      subtitleColor: "#000000",
      title: "",
      titleColor: "#000000",
      description: "",
      descriptionColor: "#000000",
      buttonText: "",
      buttonTextColor: "#FFFFFF", // Button text typically white
      url:''
    };
    setBannerItems([...bannerItems, newItem]);
  }

  useEffect(()=>{
    if (heroSections.length > 0) {
      setBannerItems(heroSections)
    }
  
  },[heroSections]);



  return (
    <div className="p-2">
      <div className="flex justify-end mb-4">
        <Button variant="default" className="bg-blue-500" onClick={handleAddItem}><Plus /></Button>
      </div>

      {bannerItems.map((item, index) => (
        <div className="shadow-lg border-1 mt-2 rounded-lg" key={index}>
        <div className="flex w-full  mt-3 rounded-lg" >
          {/* Div that takes 70% of the width */}
          <div className="w-3/5">
            <div className="relative flex flex-col items-center justify-center text-center h-96">
              {/* Background image */}
              <div className="absolute inset-0">
                <img
                  src={item.url}
                  alt="Banner"
                  className="w-full h-full object-cover opacity-50 rounded-lg"
                />
              </div>

              {/* Content overlay */}
              <div className="relative z-10">
                <p className="text-xl italic mb-2" style={{ color: item.subtitleColor }}>{item.subtitle}</p>
                <h1 className="text-6xl font-bold mb-4" style={{ color: item.titleColor }}>{item.title}</h1>
                <p className="text-4xl mb-8" style={{ color: item.descriptionColor }}>{item.description}</p>
                <Button 
                  variant="default" 
                  className="bg-blue-500"
                  style={{ color: item.buttonTextColor }}
                >
                  {item.buttonText}
                </Button>
              </div>
            </div>
          </div>

          {/* Div that takes 30% of the width */}
          <div className="w-2/5 bg-gray-50 p-4">
            <div className="flex flex-col items-center justify-center h-full">
            <label className="flex items-center mb-2 gap-2 cursor-pointer w-full">
                <div className="bg-blue-500 text-white rounded p-2 flex items-center">
                  <Upload size={16} className="mr-1" />
                  <span>Cambiar imagen de fondo</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(index, e)}
                  className="hidden"
                />
              </label>
              <div className="w-full mb-4">
                <label className="mb-2">Subtitulo:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.subtitle || ''}
                    onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="flex items-center">
                    <Palette size={16} className="mr-1" />
                    <input
                      type="color"
                      value={item.subtitleColor || '#000000'}
                      onChange={(e) => handleInputChange(index, 'subtitleColor', e.target.value)}
                      className="w-8 h-8 cursor-pointer"
                      title="Color del subtítulo"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">
                <label className="mb-2">Titulo:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="flex items-center">
                    <Palette size={16} className="mr-1" />
                    <input
                      type="color"
                      value={item.titleColor || '#000000'}
                      onChange={(e) => handleInputChange(index, 'titleColor', e.target.value)}
                      className="w-8 h-8 cursor-pointer"
                      title="Color del título"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">
                <label className="mb-2">Descripción:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="flex items-center">
                    <Palette size={16} className="mr-1" />
                    <input
                      type="color"
                      value={item.descriptionColor || '#000000'}
                      onChange={(e) => handleInputChange(index, 'descriptionColor', e.target.value)}
                      className="w-8 h-8 cursor-pointer"
                      title="Color de la descripción"
                    />
                  </div>
                </div>
              </div>

              <div className="w-full mb-4">
                <label className="mb-2">Texto del botón:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={item.buttonText || ''}
                    onChange={(e) => handleInputChange(index, 'buttonText', e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                  />
                  <div className="flex items-center">
                    <Palette size={16} className="mr-1" />
                    <input
                      type="color"
                      value={item.buttonTextColor || '#FFFFFF'}
                      onChange={(e) => handleInputChange(index, 'buttonTextColor', e.target.value)}
                      className="w-8 h-8 cursor-pointer"
                      title="Color del texto del botón"
                    />
                  </div>
                </div>
              </div>
              
             

              <Button
                variant="default"
                className="bg-blue-500 mt-4"
                onClick={() => handleSave(index)}
                disabled={loading || updatingKey === index}
              >
                 Guardar Cambios
              </Button>
            </div>
          </div>
        </div>
          <button
            title="eliminar"
            className="bg bg-red-500 p-1 rounded m-2 hover:cursor-pointer"
            onClick={() => {
              if (item.url&& item.id) {
                // Eliminar la imagen de Firebase Storage
                deletePostWithImage(item.id, item.url);
              } else {
                console.warn("URL is undefined, cannot delete image.");
              }
            }}
          >
            <Trash color="white" />
          </button>

        </div>
      ))}
    </div>
  );
};