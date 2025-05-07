

import './App.css'
import { ToastProvider } from './context/Toast'

import { AppRoutes } from './routes'

function App() {

  return (
    <ToastProvider>
      <AppRoutes />
      </ToastProvider>
  )
}

export default App
