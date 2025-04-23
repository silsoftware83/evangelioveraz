interface ButtonProps {
    children: React.ReactNode;
    primary?: boolean;
  }
export const Button = ({ children, primary = false }: ButtonProps) => {
    return primary ? (
      <button className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200">
        {children}
      </button>
    ) : (
      <button className="border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
        {children}
      </button>
    );
  };