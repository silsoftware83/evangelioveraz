import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../Firebase/firebaseConfig';
import { FormData } from '../types/Welcomesection';


export const deletePostWithImage = async (postId: string, imageUrl?: string) => {
  try {
    // 1. Eliminar la imagen de Storage si existe
    if (imageUrl) {
      deleteImageFromFirebase(imageUrl)
    }

    // 2. Eliminar el documento del post en Firestore
    await deleteDoc(doc(db, 'HeroSections', postId));
    return true; // Retorna true si la eliminación fue exitosa
  } catch (error) {
    console.error('Error eliminando el post y la imagen:', error);
    return false; // Retorna false si hubo un error
  }
};
export const deleteImageFromFirebase = async (url:string): Promise<string> => {
  try {
    // La URL del archivo que deseas eliminar
    const fileUrl =url; // Reemplaza con la URL del archivo que deseas eliminar
    
    // Extraer la ruta del archivo de la URL
    const decodedUrl = decodeURIComponent(fileUrl);
    const startIndex = decodedUrl.indexOf("/o/") + 3;
    const endIndex = decodedUrl.indexOf("?alt=media");
    const filePath = decodedUrl.substring(startIndex, endIndex);
    
    // Crear una referencia al archivo
    const fileRef = ref(storage, filePath);
    
    // Eliminar el archivo
    await deleteObject(fileRef);
    return "Archivo eliminado correctamente";
  } catch (error) {
    console.error("Error al eliminar el archivo:", error);
    throw error;
  }
};
// Asegúrate de importar addDoc

export const saveWelcomeSection = async (formData: FormData) => {
  try {
    if (formData.id) {
      await setDoc(doc(db, 'WelcomeSection', formData.id), formData, { merge: true });
    } else {
      await addDoc(collection(db, 'WelcomeSection'), formData); // esto genera un ID automáticamente
    }
    return true;
  } catch (error) {
    console.error('Error guardando la sección de bienvenida:', error);
    return false;
  }
};
