/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useState } from "react";
import { FormData } from "../../types/Welcomesection";
import { saveWelcomeSection } from "../../firebaseFunctions";
import { useToast } from "../../context/Toast";

export const WelcomeSectionEdit = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    id: "",
    headerTitle: "Hola y Bienvenido",
    headerSubtitle: "Dios es espíritu",
    leftColumnText: "Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent",
    rightColumnText: "Lorem ipsum Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent",
    bottomText: "Continua leyendo...",
  });

 

  interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevFormData: FormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async() => {
    const respuesta = await saveWelcomeSection(formData);
    if (respuesta) {
      showToast('Sección de bienvenida guardada correctamente', 'success');
    } else{
      showToast('Error al guardar la sección de bienvenida', 'error');
    }
  };

  // Preview component
  const WelcomeSectionPreview = () => {
    return (
      <div className="min-h-screen flex flex-col border rounded-lg shadow-md p-4 bg-white">
        {/* Header Section */}
        <header className="py-16 text-center">
          <h1 className="text-4xl font-bold">{formData.headerTitle}</h1>
          <p className="text-xl italic mt-2">{formData.headerSubtitle}</p>
        </header>
        
        {/* Main Content Section */}
        <main className="flex-grow px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-gray-600">
                {formData.leftColumnText}
              </div>
              <div className="text-gray-600">
                {formData.rightColumnText}
              </div>
            </div>
            
            <div className="text-center italic text-indigo-800 mb-12">
              <p>{formData.bottomText}</p>
            </div>
          </div>
        </main>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Sección de Bienvenida</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Sección de Encabezado</h3>
              
              <div className="mb-4">
                <label htmlFor="headerTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Título Principal
                </label>
                <input
                  type="text"
                  id="headerTitle"
                  name="headerTitle"
                  value={formData.headerTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="headerSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
                  Subtítulo
                </label>
                <input
                  type="text"
                  id="headerSubtitle"
                  name="headerSubtitle"
                  value={formData.headerSubtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            {/* Content Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Contenido Principal</h3>
              
              <div className="mb-4">
                <label htmlFor="leftColumnText" className="block text-sm font-medium text-gray-700 mb-1">
                  Texto Columna Izquierda
                </label>
                <textarea
                  id="leftColumnText"
                  name="leftColumnText"
                  value={formData.leftColumnText}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="rightColumnText" className="block text-sm font-medium text-gray-700 mb-1">
                  Texto Columna Derecha
                </label>
                <textarea
                  id="rightColumnText"
                  name="rightColumnText"
                  value={formData.rightColumnText}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            {/* Footer Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 pb-2 border-b">Sección Final</h3>
              
              <div className="mb-4">
                <label htmlFor="bottomText" className="block text-sm font-medium text-gray-700 mb-1">
                  Texto de Llamada a la Acción
                </label>
                <input
                  type="text"
                  id="bottomText"
                  name="bottomText"
                  value={formData.bottomText}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Vista Previa</h3>
          <WelcomeSectionPreview />
        </div>
      </div>
    </div>
  );
};
