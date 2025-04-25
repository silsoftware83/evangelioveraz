/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
}
export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bannerItems] = useState<HeroSectionProps[]>([
    {
      subtitle: "Building Holy and Healthy Lives",
      title: "The Family",
      description: "Love, Care, Share.",
      buttonText: "LEARN MORE"
    },
    {
      subtitle: "Growing Together in Faith",
      title: "Community",
      description: "Support, Encourage, Thrive.",
      buttonText: "JOIN US"
    },
    {
      subtitle: "Creating Lasting Memories",
      title: "Connections",
      description: "Bond, Trust, Cherish.",
      buttonText: "DISCOVER"
    }
  ]);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === bannerItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? bannerItems.length - 1 : prevIndex - 1
    );
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const currentBanner = bannerItems[currentIndex];
    return (
      
      <>
       
     
      <div className="relative flex flex-col items-center justify-center text-center min-h-screen p-4 bg-blue-500 opacity-50 ">
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
        <button 
          onClick={prevSlide}
          className="bg-gray-200 p-2 rounded-full opacity-70 hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
      </div>
      
      <div className="transition-opacity duration-500">
        <p className="text-xl italic mb-2">{currentBanner.subtitle}</p>
        <h1 className="text-7xl font-bold mb-4">{currentBanner.title}</h1>
        <p className="text-4xl mb-8">{currentBanner.description}</p>
        <Button>{currentBanner.buttonText}</Button>
      </div>
      
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
        <button 
          onClick={nextSlide}
          className="bg-gray-200 p-2 rounded-full opacity-70 hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 flex space-x-2">
        {bannerItems.map((_, index) => (
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
    </>
    );
  };