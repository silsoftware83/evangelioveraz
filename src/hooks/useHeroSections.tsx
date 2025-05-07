/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig"; // Asegúrate que esté bien importado
import { HeroSectionProps } from "../types/HeroSection";
// Ajusta el path según dónde esté tu interfaz

export function useHeroSections() {
  const [heroSections, setHeroSections] = useState<HeroSectionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "HeroSections"));
        const data: HeroSectionProps[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Añadir el ID del documento
          ...doc.data()
        })) as HeroSectionProps[];
        setHeroSections(data);
      } catch (err: any) {
        setError("Error al obtener datos de HeroSection");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroSections();
  }, []);

  return { heroSections, loading, error };
}