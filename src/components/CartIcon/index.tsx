import { ShoppingBag } from "lucide-react";

export const CartIcon = () => {
    return (
      <div className="relative">
        <ShoppingBag size={20} className="cursor-pointer" />
        <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
      </div>
    );
  };