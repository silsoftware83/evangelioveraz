import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { ComunitySection } from "./ComunitySection/ComunitySection";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection";
import { PlaceForYou } from "./PlaceForYouSection/PlaceForYou";
import { AboutSection } from "./AboutSection/AboutSection";
import Causas from "./OurCauses";
import FraseConNewsletter from "./NewsLetterSection/NewsLetterSection";


export default function ChurchWebsite() {
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
