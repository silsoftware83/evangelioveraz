/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuth } from "../auth/AuthContext";


export const Layout = ({ children }: any) => {
  const { logout } = useAuth();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
       
          {children}
       
      </main>


    </div>
  )
}
