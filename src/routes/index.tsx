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
import RegisterForm from '../pages/RegisterPage';
import { WelcomeGestion } from '../pages/Admin/WelcomeGestion';
import { PlaceForYouGestion } from '../pages/Admin/PlaceForYouGestion';
import AboutTeacher from '../pages/Admin/AboutTeacher';
import CausaEditor from '../pages/Admin/OurMision';
// import { WelcomeGestion } from '../pages/Admin/WelcomeGestion';

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

  const routes: AppRouteInterfaz[]= [
    {path: '/admin', element: <Admin />},
    {path: '/herosectionEdit', element: <HeroSectionGestion />},
    {path: '/welcomeEdit', element: <WelcomeGestion />},
    {path:'/PlaceForYouEdit', element: <PlaceForYouGestion />},
    {path:'/AboutTeacher', element: <AboutTeacher />},
    {path:'/CausaEditor', element: <CausaEditor />},
  ];
  return (

    <BrowserRouter>
      <Routes>
      
      
        <Route path="/" element={<Landing />} />

        {/* Rutas de autenticación - sin Layout principal */}
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
       

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
       

        {/* Ruta de 404 - también sin Layout principal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* {alertPortal} */}
    </BrowserRouter>

  )
}



