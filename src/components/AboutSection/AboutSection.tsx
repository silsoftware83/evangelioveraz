import { Facebook, Instagram, Youtube } from 'lucide-react'


export const AboutSection = () => {
  return (
    <div className="bg-gray-800 text-white py-16">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Profile Image */}
      <div className="md:w-1/4 flex justify-center mb-8 md:mb-0">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700">
          <img 
            src="/api/placeholder/200/200" 
            alt="Carlos Ochoa" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="md:w-3/4 md:pl-12">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-1">Carlos Ochoa</h2>
            <p className="text-gray-400 mb-6">Maestro</p>
            <p className="text-gray-400 leading-relaxed">
              Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
              tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
              ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in
              hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et
              accumsan et iusto odio dignissim qui blandit praesent
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-3">
            <a href="#" className="hover:text-gray-300">
              <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Facebook size={24} />
            </a>
            <a href="#" className="hover:text-gray-300">
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
