/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/getAllPageContent.ts
import { getDocs, collection } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig";


export const getAllPageContent = async () => {
  const collections = [
    { key: "heroSection", name: "HeroSections" },
    { key: "welcomeSection", name: "WelcomeSection" },
    { key: "comunitySection", name: "ComunitySection" },
    { key: "placeForYou", name: "PlaceForYouEdit" },
    { key: "aboutSection", name: "aboutteacher" },
    { key: "causes", name: "OurCausa" },
    { key: "quoteSection", name: "quotes" }
  ];

  const result: Record<string, any> = {};

  await Promise.all(
    collections.map(async ({ key, name }) => {
      const querySnapshot = await getDocs(collection(db, name));
      const doc = querySnapshot.docs[0]; // asumimos un solo documento por colección
      if (doc) {
        result[key] = doc.data();
      }
    })
  );

  return result;
};
