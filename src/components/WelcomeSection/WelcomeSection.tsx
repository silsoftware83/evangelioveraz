

export const WelcomeSection = () => {
  return (
    <>
    {/* Header Section */}
    <header className="py-16 text-center">
      <h1 className="text-4xl font-bold">Hola y Bienvenido</h1>
      <p className="text-xl italic mt-2">Dios es espíritu</p>
    </header>

    {/* Main Content Section */}
    <main className="flex-grow px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-gray-600">
            Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna 
            aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud 
            exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo 
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate 
            velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis 
            at vero eros et accumsan et iusto odio dignissim qui blandit praesent
          </div>
          <div className="text-gray-600">
            Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, 
            sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna 
            aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud 
            exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo 
            consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate 
            velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis 
            at vero eros et accumsan et iusto odio dignissim qui blandit praesent
          </div>
        </div>
        
        <div className="text-center italic text-indigo-800 mb-12">
          <p>Continua leyendo...</p>
        </div>
      </div>
    </main>
    </>
  )
}
