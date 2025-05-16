
import { Search } from "lucide-react";
import { Logo } from "../Logo";
import { Navigation } from "../Navigation";
import { CartIcon } from "../CartIcon";
import { SocialIcons } from "../SocialIcons";
import { Button } from "../Button";



  import  { useState, useEffect } from 'react';

// ... other components remain the same ...

// Header Component
export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 transition-all duration-300 ${
        scrolled ? 'bg-black opacity-50 shadow-lg' : 'bg-transparent'
      }`}
    >
      <Logo />
      <Navigation />
      <div className="flex items-center space-x-6">
        <SocialIcons />
        <Search size={20} className="cursor-pointer" />
        <CartIcon />
        <Button primary>Donaciones</Button>
      </div>
    </header>
  );
};

