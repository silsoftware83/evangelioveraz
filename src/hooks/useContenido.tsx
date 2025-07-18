/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
 // Asegúrate que este sea el path correcto

interface ContenidoData {
  [key: string]: any;
  imagen?: string;
  actualizadoEn?: any;
}

export const useContenido = () => {
  const [data, setData] = useState<ContenidoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = doc(db, "PlaceForYouEdit", "contenido");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.data() as ContenidoData);
        } else {
          setData(null);
        }
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { data, loading, error };
};
