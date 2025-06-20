/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig"; // Asegúrate de importar tu configuración de Firebase
import { Button } from "../components/ui/Button";
import { Link } from "react-router-dom";
import { Reply } from "lucide-react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("cliente");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    // Reset states
    setError("");
    setSuccess(false);

    // Validate inputs
    if (!email || !password || !confirmPassword || !name) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);

      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;



      // Save additional information in Firestore
      await setDoc(doc(db, "users", uid), {
        email,
        name,
        userType,
        createdAt: new Date()
      });

      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setUserType("cliente");
      setSuccess(true);
    } catch (err: any) {
      const errorMessage =
        err.code === "auth/email-already-in-use" ? "El correo ya está en uso" :
          err.code === "auth/invalid-email" ? "Correo electrónico inválido" :
            "Error al crear la cuenta. Inténtalo de nuevo.";

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" justify-center items-center h-screen bg-gray-100 p-5">
      <Button className="ml-2 bg-red-500" >
        <Link to={'/admin'} className='flex items-center text-white'>
          <Reply />Volver
        </Link>
      </Button>

      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro de Usuario</h2>

        {success && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
            ¡Usuario registrado con éxito!
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Nombre Completo
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
              Confirmar Contraseña
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirma tu contraseña"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="userType">
              Tipo de Usuario
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" id="userType" value={userType} onChange={(e) => setUserType(e.target.value)} >
              <option value="cliente">Cliente</option>
              <option value="empleado">Empleado</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            className={`w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            onClick={handleRegister}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar Usuario"}
          </button>
        </div>
      </div>
    </div>
  );
}