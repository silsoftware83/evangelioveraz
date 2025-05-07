/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useHeroSections } from "../../hooks/useHeroSections";
// import { HeroSectionProps } from "../../types/HeroSection";

// interface HeroSectionProps {
//   title?: string;
//   subtitle?: string;
//   description?: string;
//   buttonText?: string;
// }
export const HeroSection = () => {
    const {heroSections} = useHeroSections();
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [bannerItems,setBannerItems] = useState<HeroSectionProps[]>([]);
  const nextSlide = () => {
    
    setCurrentIndex((prevIndex) => 
      prevIndex === heroSections.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? heroSections.length - 1 : prevIndex - 1
    );
  };

//   useEffect(() => {
//     if (heroSections.length > 0) {
//       getData(heroSections)
      
//     }
//   },[heroSections]);


// const getData = async (heroSections: HeroSectionProps[]) => {
//   if (heroSections) {
   
//     setBannerItems(heroSections);
//   }
// };

  const currentBanner = heroSections[currentIndex];

    return (
      
      heroSections.length > 0 &&
      (
        <div  className="relative flex flex-col items-center justify-center text-center min-h-screen p-4"  style={{ backgroundImage: `url(${currentBanner.url})`, backgroundSize: 'cover',backgroundPosition: 'center',    backgroundRepeat: 'no-repeat',  }}>
          {/* Overlay opcional para oscurecer un poco el fondo */}
          <div className="absolute inset-0 bg-blue-500 opacity-50 z-0"></div>
      
          {/* Flecha izquierda */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="bg-gray-200 p-2 rounded-full opacity-70 hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
      
          {/* Contenido del banner */}
          <div className="z-10 transition-opacity duration-500 text-white">
            <p className="text-xl italic mb-2">{currentBanner.subtitle}</p>
            <h1 className="text-7xl font-bold mb-4">{currentBanner.title}</h1>
            <p className="text-4xl mb-8">{currentBanner.description}</p>
            <Button>{currentBanner.buttonText}</Button>
          </div>
      
          {/* Flecha derecha */}
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="bg-gray-200 p-2 rounded-full opacity-70 hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
      
          {/* Indicadores */}
          <div className="absolute bottom-8 flex space-x-2 z-10">
            {heroSections.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      )
      
    );
  };

  