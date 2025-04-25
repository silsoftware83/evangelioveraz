

export const ComunitySection = () => {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-4">
        <div className="bg-indigo-900 text-white p-12 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Nuestro comunidad</h2>
          <button className="bg-transparent border border-white px-4 py-2 text-sm font-bold mt-auto">
            LEER MÁS
          </button>
        </div>
        
        <div className="bg-indigo-950 text-white p-12 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Misión</h2>
          <button className="bg-transparent border border-white px-4 py-2 text-sm font-bold mt-auto">
            LEER MÁS
          </button>
        </div>
        
        <div className="bg-purple-700 text-white p-12 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Únete a un grupo</h2>
          <button className="bg-transparent border border-white px-4 py-2 text-sm font-bold mt-auto">
            LEER MÁS
          </button>
        </div>
        
        <div className="bg-blue-400 text-white p-12 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-6">Creencia</h2>
          <button className="bg-transparent border border-white px-4 py-2 text-sm font-bold mt-auto">
            LEER MÁS
          </button>
        </div>
      </footer>
  )
}
