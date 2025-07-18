import { Facebook, Instagram, Youtube } from 'lucide-react'
import { useAboutTeacher } from '../../hooks/useAboutTeacher';


export const AboutSection = () => {
  const { data, loading, error } = useAboutTeacher();
  console.log("TCL: AboutSection -> data", data);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No content available</div>;
  return (
    <div className="bg-gray-800 text-white py-16">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
      {/* Profile Image */}
      <div className="md:w-1/4 flex justify-center mb-8 md:mb-0">
        <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700">
          <img 
            src={data.profileImage || "https://via.placeholder.com/150"} 
            alt="Carlos Ochoa" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="md:w-3/4 md:pl-12">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-1">{data.name}</h2>
            <p className="text-gray-400 mb-6">{data.title}</p>
            <p className="text-gray-400 leading-relaxed">
              {data.description || "Carlos Ochoa es un apasionado líder espiritual con más de 20 años de experiencia en el ministerio. Su dedicación a la enseñanza y su amor por la comunidad lo han convertido en una figura clave en nuestra iglesia."}
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
