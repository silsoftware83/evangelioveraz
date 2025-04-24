import { useState } from "react";
import { Button } from "../ui/Button";
import { Plus } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  url?: string;
}

// {
//   subtitle: "Building Holy and Healthy Lives",
//   title: "The Family",
//   description: "Love, Care, Share.",
//   buttonText: "LEARN MORE",
//     url: "https://api.algobook.info/v1/randomimage?category=places",

// },
export const HeroSectionEdit = () => {
  const [bannerItems, setBannerItems] = useState<HeroSectionProps[]>([]);

  const handleInputChange = (index: number, field: keyof HeroSectionProps, value: string) => {
    const updatedItems = [...bannerItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setBannerItems(updatedItems);
  };

  const handleSave = (index: number) => {
    // Here you would typically save the data to a server
    console.log("Saving item:", bannerItems[index]);
    alert("Changes saved!");
  };

  const handleAddItem = () => {
    const newItem: HeroSectionProps = {
      subtitle: "",
      title: "",
      description: "",
      buttonText: "",
      url: "https://api.algobook.info/v1/randomimage?category=places",
    };
    setBannerItems([...bannerItems, newItem]);
  }
  return (
    <div className="p-2">
        <div className="flex justify-end mb-4">
        <Button variant="default" className="bg-blue-500" onClick={handleAddItem} ><Plus/></Button>
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
                <p className="text-xl italic mb-2">{item.subtitle}</p>
                <h1 className="text-6xl font-bold mb-4">{item.title}</h1>
                <p className="text-4xl mb-8">{item.description}</p>
                <Button variant="default" className="bg-blue-500">{item.buttonText}</Button>
              </div>
            </div>
          </div>
          
          {/* Div that takes 30% of the width */}
          <div className="w-2/5 bg-gray-50 p-4">
            <form className="flex flex-col items-center justify-center h-full">
              <label className="mb-2">Subtitulo:</label>
              <input 
                type="text" 
                value={item.subtitle || ''} 
                onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              
              <label className="mb-2">Titulo:</label>
              <input 
                type="text" 
                value={item.title || ''} 
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              
              <label className="mb-2">Descripción:</label>
              <input 
                type="text" 
                value={item.description || ''} 
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              
              <label className="mb-2">Texto del boton:</label>
              <input 
                type="text" 
                value={item.buttonText || ''} 
                onChange={(e) => handleInputChange(index, 'buttonText', e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded w-full"
              />
              
              <Button 
                variant="default" 
                className="bg-blue-500"
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