import { Facebook, Instagram, Twitter } from "lucide-react";

export const SocialIcons = () => {
    return (
      <div className="flex space-x-4">
        <Facebook size={20} className="cursor-pointer" />
        <Twitter size={20} className="cursor-pointer" />
        <Instagram size={20} className="cursor-pointer" />
      </div>
    );
  };