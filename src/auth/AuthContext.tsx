/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext,  ReactNode, useState, useEffect } from 'react'

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth'

// import { showAlert } from '../utils/alert'


  
  // Agrega más campos según necesites


  interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    loading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<User>
    logout: () => Promise<void>
  }

const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const auth = getAuth()

    // Verificar si hay datos de usuario en sessionStorage al cargar
    useEffect(() => {
      const checkStoredUser = () => {
        const storedUser = sessionStorage.getItem('authUser')
        if (storedUser) {
          // Si hay un usuario guardado en sessionStorage, actualizar el estado
          // (aunque Firebase también detectará la sesión activa a través de onAuthStateChanged)
          setUser(JSON.parse(storedUser))
        }
        setLoading(false)
      }
      
      checkStoredUser()
    }, [])
  
  // Escuchar cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      
      // Si hay un usuario autenticado pero no está en sessionStorage, guardarlo
      if (currentUser && !sessionStorage.getItem('authUser')) {
        const saveUserData = async () => {
          const userData = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            token: await currentUser.getIdToken()
          }
          sessionStorage.setItem('authUser', JSON.stringify(userData))
        }
        saveUserData()
      }
      
      // Si no hay usuario autenticado pero hay datos en sessionStorage, limpiarlos
      if (!currentUser && sessionStorage.getItem('authUser')) {
        sessionStorage.removeItem('authUser')
      }
      
      setLoading(false)
    })
    
    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe()
  }, [auth])

  const login = async (email: string, password: string) => {
    setError(null)
    try {
      setLoading(true)
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setUser(userCredential.user)
      
      // Guardar datos en sessionStorage
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
        token: await userCredential.user.getIdToken()
      }
      
      // Guardamos los datos del usuario en sessionStorage
      sessionStorage.setItem('authUser', JSON.stringify(userData))
      
      // Si tienes una función para mostrar alertas, puedes descomentar esto
      // showAlert({ type: 'success', message: 'Inicio de sesión exitoso' })
      
      return userCredential.user
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error)
      setError(traducirErrorFirebase(error.code))
      // showAlert({ type: 'error', message: traducirErrorFirebase(error.code) })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setError(null)
    try {
      setLoading(true)
      await signOut(auth)
      setUser(null)
      
      // Eliminar datos de sessionStorage al cerrar sesión
      sessionStorage.removeItem('authUser')
      
      // showAlert({ type: 'success', message: 'Sesión cerrada correctamente' })
      return true
    } catch (error: any) {
      console.error('Error al cerrar sesión:', error)
      setError(error.message)
      // showAlert({ type: 'error', message: 'Error al cerrar sesión' })
      return false
    } finally {
      setLoading(false)
    }
  }

  const traducirErrorFirebase = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'El formato del correo electrónico no es válido.'
      case 'auth/user-disabled':
        return 'Esta cuenta ha sido deshabilitada.'
      case 'auth/user-not-found':
        return 'No existe una cuenta con este correo electrónico.'
      case 'auth/wrong-password':
        return 'Contraseña incorrecta.'
      case 'auth/too-many-requests':
        return 'Demasiados intentos fallidos. Intenta más tarde.'
      case 'auth/network-request-failed':
        return 'Error de red. Verifica tu conexión a internet.'
      default:
        return `Error de autenticación: ${errorCode}`
    }
  }

 const value:any = {
    isAuthenticated: !!user,
    user,
    loading,
    error,
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