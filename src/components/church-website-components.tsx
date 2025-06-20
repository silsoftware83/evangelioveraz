/* eslint-disable @typescript-eslint/no-explicit-any */
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { ComunitySection } from "./ComunitySection/ComunitySection";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection";
import { PlaceForYou } from "./PlaceForYouSection/PlaceForYou";
import { AboutSection } from "./AboutSection/AboutSection";
import Causas from "./OurCauses";
import FraseConNewsletter from "./NewsLetterSection/NewsLetterSection";
import { useEffect, useState } from "react";
import { getAllPageContent } from "../hooks/getAllPageContent";
import { PageContent } from "../types/HomePage";


export default function ChurchWebsite() {
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getAllPageContent();
      setContent(data as PageContent);
    };

    fetchContent();
  }, []);

  if(!content) {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  return (
    <>
      <div className="relative w-full text-white">
        <div className="absolute inset-0 bg-blue-900  z-0"></div>
          <Header />
        <div className="relative z-10 pt-30">
          <HeroSection />
        </div>
      </div>
      <div className="min-h-screen flex flex-col">
        <WelcomeSection />
        <ComunitySection />
      </div>
      <div className="flex flex-col min-h-screen">
        <PlaceForYou />
        <AboutSection />
      </div>
    <Causas />
  <FraseConNewsletter />

    </>
  );
}
