import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";
import { FormData } from "../types/Welcomesection";

export function useWelcomeSection() {
  const [welcomeSections, setWelcomeSections] = useState<FormData>({
    id: '',
    headerTitle: '',
    headerSubtitle: '',
    leftColumnText: '',
    rightColumnText: '',
    bottomText: 'Por favor espera...',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWelcomeSections = async () => {
      try {
        const welcomeSectionRef = collection(db, "WelcomeSection");
        const snapshot = await getDocs(welcomeSectionRef);

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();
          const welcomeSectionsData: FormData = {
            id: doc.id,
            ...data,
          } as FormData;
          console.log("TCL: fetchWelcomeSections -> welcomeSectionsData", welcomeSectionsData)
          setWelcomeSections(welcomeSectionsData);
        } else {
          setError("No se encontró ningún documento en welcomeSection");
        }
      } catch (err: unknown) {
        setError("Error al obtener datos de welcomeSection");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWelcomeSections();
  }, []);

  return { welcomeSections, loading, error };
}
