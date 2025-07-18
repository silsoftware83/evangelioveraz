import { useContenido } from "../../hooks/useContenido";

export const PlaceForYou = () => {
  const { data, loading, error } = useContenido();
 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No content available</div>;
  return (
  
    <div className="relative h-96 bg-gray-900 overflow-hidden">
    <div className="absolute inset-0 flex">
      {/* Left side: Image */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-8">
            <img 
              src={data.imagen || "https://via.placeholder.com/600x400"} 
              alt="Manos en oración sobre Biblia abierta" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Right side: Text */}
      <div className="w-1/2 flex items-center justify-center text-white p-8">
        <div className="text-right">
          <p className="text-lg italic text-gray-300 mb-4">{data.mensaje}</p>
          <h1 className="text-4xl font-bold mb-2">{data.titulo}</h1>
          <h2 className="text-3xl mb-8">{data.subtitulo}</h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-bold">
            {data.textoBoton || "Descubre más"}
          </button>
        </div>
      </div>
    </div>
 </div>
  
  )
}
