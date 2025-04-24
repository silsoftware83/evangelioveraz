// App.tsx
import React, { ReactElement } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'



import '../App.css'
import { Login } from '../pages/Login';
import { Landing } from '../pages/Landin';
import { useAuth } from '../auth/AuthContext';
import { Layout } from '../Layouts';
import { Admin } from '../pages/Admin';
import { HeroSectionGestion } from '../pages/Admin/HeroSectionGestion';

interface AppRouteInterfaz {
    path: string;
    element: ReactElement;
  }
// import ModernChatUI from '../pages/pruebas';
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  // Aquí puedes poner tu lógica de autenticación
  const { isAuthenticated } = useAuth()// O tu método de verificación


  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Layout>{children}</Layout>
}

export const AppRoutes = () => {

//   const { alertPortal } = useAlert();
  const routes: AppRouteInterfaz[]= [
    {path: '/admin', element: <Admin />},
    {path: '/herosection', element: <HeroSectionGestion />},

  ];
  return (

    <BrowserRouter>
      <Routes>
      
      
        <Route path="/" element={<Landing />} />

        {/* Rutas de autenticación - sin Layout principal */}
       
        <Route path="/login" element={<Login />} />
         
       

        {/* Rutas protegidas - con Layout principal */}

        {routes.map((route, key) => (
          <Route path={route.path} key={key}
            element={
              <ProtectedLayout>
                {route.element}
              </ProtectedLayout>
            }
          />
        ))}
       

     

        {/* <Route
          path="/encuestas"
          element={
            <ProtectedLayout>
              <FormManagement />
            </ProtectedLayout>
       
          }
        /> */}

        {/* Ejemplo de cómo añadir más rutas protegidas */}
        {/* <Route
          path="/contracts"
          element={
            <ProtectedLayout>
              <ContractsTable />
            </ProtectedLayout>
          }
        /> */}

        {/* < <Route
          path="/settings"
          element={
            <ProtectedLayout>
              <SettingsPage />
            </ProtectedLayout>
          }
        /> */}

        {/* Ruta de 404 - también sin Layout principal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* {alertPortal} */}
    </BrowserRouter>

  )
}



