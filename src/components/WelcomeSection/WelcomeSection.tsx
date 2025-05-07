import { useWelcomeSection } from "../../hooks/useWelcomeSection";



export const WelcomeSection = () => {
  const { welcomeSections } = useWelcomeSection();

  
  console.log("TCL: WelcomeSection -> welcomeSections", welcomeSections)
  return (
    <>
    {/* Header Section */}
    {/* <header className="py-16 text-center">
      <h1 className="text-4xl font-bold">{welcomeSections.headerTitle}</h1>
      <p className="text-xl italic mt-2">{welcomeSections.headerSubtitle}</p>
    </header> */}

    {/* Main Content Section */}
    <main className="flex-grow px-4">
      {/* <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="text-gray-600">
           {welcomeSections.leftColumnText}
          </div>
          <div className="text-gray-600">
          {welcomeSections.rightColumnText}
          </div>
        </div>
        
        <div className="text-center italic text-indigo-800 mb-12">
          <p>{welcomeSections.bottomText}</p>
        </div>
      </div> */}
    </main>
    </>
  )
}
