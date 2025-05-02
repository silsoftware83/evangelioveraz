import { useState } from "react";
import { Button } from "../ui/Button";
import { Plus, Upload, Palette } from "lucide-react";
import { HeroSectionProps } from "../../types/HeroSection";



export const HeroSectionEdit = () => {
  const [bannerItems, setBannerItems] = useState<HeroSectionProps[]>([]);

  const handleInputChange = (index: number, field: keyof HeroSectionProps, value: string) => {
    const updatedItems = [...bannerItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setBannerItems(updatedItems);
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a local URL for the selected image
      const localUrl = URL.createObjectURL(file);
      const updatedItems = [...bannerItems];
      updatedItems[index] = { ...updatedItems[index], url: localUrl };
      setBannerItems(updatedItems);
    }
  };

  const handleSave = (index: number) => {
    // Here you would typically save the data to a server
    console.log("Saving item:", bannerItems[index]);
    alert("Changes saved!");
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
      url: "https://api.algobook.info/v1/randomimage?category=places",
    };
    setBannerItems([...bannerItems, newItem]);
  }

  return (
    <div className="p-2">
      <div className="flex justify-end mb-4">
        <Button variant="default" className="bg-blue-500" onClick={handleAddItem}><Plus /></Button>
      </div>

      {bannerItems.map((item, index) => (
        <div className="flex w-full border-1 mt-3 rounded-lg" key={index}>
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
            <form className="flex flex-col items-center justify-center h-full">
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
              >
                Guardar Cambios
              </Button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};