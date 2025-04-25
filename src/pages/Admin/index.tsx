// src/pages/Admin.tsx

import { Link } from "react-router-dom"




export const Admin = () => {
 

  return (
    
      <>
    
    <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bienvenido al Panel de Administración</h2>
          <p className="text-gray-600 mb-4">
            Desde aquí puedes gestionar todos los aspectos de tu sitio web.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            <Link to={'/herosectionEdit'} className="border border-gray-200 p-4 rounded">
              <h3 className="font-medium mb-2">Hero section</h3>
              <p className="text-sm text-gray-500">Baner de inicio y titulos</p>
            </Link>
            <Link to='/bienvenidaEdit' className="border border-gray-200 p-4 rounded">
              <h3 className="font-medium mb-2">Seccion de Bienvenida</h3>
              <p className="text-sm text-gray-500">Mensaje de bienvenida</p>
            </Link>
            <div className="border border-gray-200 p-4 rounded">
              <h3 className="font-medium mb-2">Estadísticas</h3>
              <p className="text-sm text-gray-500">Visualiza métricas y datos</p>
            </div>
          </div>
      </div>
      
      </>
    
       
    
  );
};