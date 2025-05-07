import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { db, storage } from '../Firebase/firebaseConfig';

// Función para obtener el path del archivo desde la URL
const getStoragePathFromUrl = (url: string): string | null => {
  try {
    const decodedUrl = decodeURIComponent(url);
    const match = decodedUrl.match(/\/o\/(.+)\?alt=media/);
    return match ? match[1] : null;
  } catch (error) {
    console.error('Error al decodificar la URL:', error);
    return null;
  }
};

export const deletePostWithImage = async (postId: string, imageUrl?: string) => {
  try {
    // 1. Eliminar la imagen de Storage si existe
    if (imageUrl) {
      const path = getStoragePathFromUrl(imageUrl);
      if (path) {
        const imageRef = ref(storage, path);
        await deleteObject(imageRef);
        console.log('Imagen eliminada correctamente.');
      } else {
        console.warn('No se pudo obtener la ruta del archivo desde la URL.');
      }
    }

    // 2. Eliminar el documento del post en Firestore
    await deleteDoc(doc(db, 'posts', postId));
    console.log('Post eliminado correctamente.');
  } catch (error) {
    console.error('Error eliminando el post y la imagen:', error);
  }
};
