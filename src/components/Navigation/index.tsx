// Navigation Component
export const Navigation = () => {
    const navItems = ['Inicio', 'Misiones', 'Videos', 'Blog', 'Libros', 'Comunidad'];
    
    return (
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="hover:text-gray-300 text-white font-size-32">
            {item}
          </a>
        ))}
      </nav>
    );
  };