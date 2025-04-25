
export const PlaceForYou = () => {
  return (
  
    <div className="relative h-96 bg-gray-900 overflow-hidden">
    <div className="absolute inset-0 flex">
      {/* Left side: Image */}
      <div className="w-1/2 relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-8">
            <img 
              src="/api/placeholder/600/400" 
              alt="Manos en oración sobre Biblia abierta" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Right side: Text */}
      <div className="w-1/2 flex items-center justify-center text-white p-8">
        <div className="text-right">
          <p className="text-lg italic text-gray-300 mb-4">Un lugar para ti</p>
          <h1 className="text-4xl font-bold mb-2">Estamos completos en Cristo...</h1>
          <h2 className="text-3xl mb-8">así como en Cristo</h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-full font-bold">
            HAZTE MIEMBRO
          </button>
        </div>
      </div>
    </div>
 </div>
  
  )
}
