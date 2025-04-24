/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext,  ReactNode } from 'react'



// import { showAlert } from '../utils/alert'


  
  // Agrega más campos según necesites


interface AuthContextType {
  
  isAuthenticated: boolean
  login:any
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {


  const login = async () => {
    // try {
    //   const data = formData


    //   const response = await request.post('login',data)
      
    
    //   if (response && response.statusCode === 200 && response.result.errorboss==false) {
    //       const respuesta = response.result

    //       sessionStorage.setItem('authToken', encryptString(respuesta.access_token));
    //       const user = encryptString(JSON.stringify(respuesta.user))
    //       sessionStorage.setItem('user', user);
    //       sessionStorage.setItem('home', respuesta.home.url);
    //       sessionStorage.setItem('modulos', JSON.stringify(respuesta.permisos));
    //       sessionStorage.setItem('permisosAcceso', JSON.stringify(respuesta.permisosAcceso));
    //       sessionStorage.setItem('areaboss', JSON.stringify(respuesta.isareaboss));
    //       sessionStorage.setItem('personal', JSON.stringify(respuesta.isinmediatedboss));
         
    //       if (respuesta.device == null && respuesta.deviceOffice==null) {
    //         // deleteTokenFromIndexedDB()
    //       }else{

    //         sessionStorage.setItem('device',respuesta.device)
    //         sessionStorage.setItem('deviceOffice',respuesta.deviceOffice)
    //       }
         
    //     setUser(respuesta.user)  
    //         return true

    //     }else if(response.statusCode== 503){
    //       showAlert({
    //         type: 'danger',
    //         title: 'Error!',
    //         message: 'Usuario o contraseña no validos!'
    //       });
         
    //     }else if(response.statusCode== 403){
    //       showAlert({
    //         type: 'danger',
    //         title: 'Error!',
    //         message: 'Usuario no activo, contacte a su administrador!'
    //       });
         
    //     }
        
        
    //     else{
    //       showAlert({
    //         type: 'danger',
    //         title: 'Datos imcompletos !',
    //         message: 'jefe directo,puesto o departamento faltante!'
    //       });
        
         
    //     }
       
    
    // } catch (error) {
    //   console.error('Error en login:', error)
    //   throw error
    // }

  }

  const logout = () => {
    
  }

  const value = {
   
    isAuthenticated:true,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}