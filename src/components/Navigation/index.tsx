// Navigation Component
export const Navigation = () => {
    const navItems = ['HOME', 'FEATURES', 'SERMONS', 'EVENTS', 'SHORTCODES', 'POST TYPES'];
    
    return (
      <nav className="hidden md:flex items-center space-x-8">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="hover:text-gray-300">
            {item}
          </a>
        ))}
      </nav>
    );
  };