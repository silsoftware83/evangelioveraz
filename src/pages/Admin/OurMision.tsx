// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState, useCallback } from 'react';
// import { Plus, Trash2, Save, Reply } from 'lucide-react';
// import {
//   doc,
//   setDoc,
//   getDoc
// } from 'firebase/firestore';
// import { db } from '../../Firebase/firebaseConfig';
// import { Button } from '../../components/ui/Button';
// import { Link } from 'react-router-dom';

// type Item = {
//   id: number;
//   title: string;
//   subtitle: string;
//   description: string;
//   videoText: string;
//    imageUrl?: string; // nueva propiedad
//    imageFile?: File; // solo temporal, no se guarda en Firestore
// };

// type SectionData = {
//   title: string;
//   subtitle: string;
//   items: Item[];
// };

// const CausaEditor = () => {
//   const [sectionData, setSectionData] = useState<SectionData>({
//     title: '',
//     subtitle: '',
//     items: []
//   });

//   const [isSaving, setIsSaving] = useState(false);

//   const fetchData = async () => {
//     const docRef = doc(db, 'OurCausa', 'data');
//     const snap = await getDoc(docRef);
//     if (snap.exists()) {
//       setSectionData(snap.data() as any);
//     }
//   };

//   const saveData = async () => {
//     setIsSaving(true);
//     const docRef = doc(db, 'OurCausa', 'data');
//     await setDoc(docRef, sectionData, { merge: true });
//     setIsSaving(false);
//     alert('Contenido guardado correctamente');
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const addNewItem = useCallback(() => {
//     const newItem = {
//       id: Date.now(),
//       title: "Nuevo título",
//       subtitle: "Nueva categoría",
//       description: "Nueva descripción...",
//       videoText: "Ver video",
//       imageUrl: "https://via.placeholder.com/150" // nueva propiedad
//     };
//     setSectionData(prev => ({
//       ...prev,
//       items: [...prev.items, newItem]
//     }));
//   }, []);

//   const removeItem = useCallback((id: any) => {
//     setSectionData(prev => ({
//       ...prev,
//       items: prev.items.filter(item => item.id !== id)
//     }));
//   }, []);

//   const updateItem = useCallback((id: any, field: any, value: any) => {
//     setSectionData(prev => ({
//       ...prev,
//       items: prev.items.map(item =>
//         item.id === id ? { ...item, [field]: value } : item
//       )
//     }));
//   }, []);

//   const updateSectionTitle = useCallback((value: string) => {
//     setSectionData(prev => ({ ...prev, title: value }));
//   }, []);

//   const updateSectionSubtitle = useCallback((value: string) => {
//     setSectionData(prev => ({ ...prev, subtitle: value }));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="">
//           <Button className="ml-2 bg-red-500" >
//             <Link to={'/admin'} className='flex items-center text-white'>
//               <Reply />Volver
//             </Link>
//           </Button>
//           <div className="overflow-y-auto">
//             <div className="bg-white rounded-lg shadow-lg h-full">
//               <div className="border-b border-gray-200 p-4 flex justify-between items-center">
//                 <h2 className="text-xl font-bold text-gray-800">Editor de Sección</h2>
//                 <button
//                   onClick={saveData}
//                   disabled={isSaving}
//                   className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 text-sm"
//                 >
//                   <Save size={14} />
//                   {isSaving ? 'Guardando...' : 'Guardar'}
//                 </button>
//               </div>

//               <div className="p-4 space-y-6">
//                 {/* Configuración general */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-700">Configuración General</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
//                       <input
//                         type="text"
//                         value={sectionData.title}
//                         onChange={(e) => updateSectionTitle(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
//                       <input
//                         type="text"
//                         value={sectionData.subtitle}
//                         onChange={(e) => updateSectionSubtitle(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Items */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="text-lg font-semibold text-gray-700">Items de Contenido</h3>
//                     <button
//                       onClick={addNewItem}
//                       className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
//                     >
//                       <Plus size={14} />
//                       Agregar
//                     </button>
//                   </div>

//                   <div className="space-y-4 overflow-y-scroll max-h-[400px]">
//                     {sectionData.items.map((item, index) => (
//                       <div key={item.id} className="border border-gray-200 rounded-lg p-4">
//                         <div className="flex items-center justify-between mb-3">
//                           <h4 className="font-medium text-gray-800 text-sm">Item {index + 1}</h4>
//                           <button
//                             onClick={() => removeItem(item.id)}
//                             className="text-red-600 hover:text-red-800 transition-colors"
//                           >
//                             <Trash2 size={14} />
//                           </button>
//                         </div>

//                         <div className="space-y-3">
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Título</label>
//                             <input
//                               type="text"
//                               value={item.title}
//                               onChange={(e) => updateItem(item.id, 'title', e.target.value)}
//                               className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Categoría/Subtítulo</label>
//                             <input
//                               type="text"
//                               value={item.subtitle}
//                               onChange={(e) => updateItem(item.id, 'subtitle', e.target.value)}
//                               className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
//                             <textarea
//                               value={item.description}
//                               onChange={(e) => updateItem(item.id, 'description', e.target.value)}
//                               rows={2}
//                               className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-xs font-medium text-gray-700 mb-1">Texto del enlace de video</label>
//                             <input
//                               type="text"
//                               value={item.videoText}
//                               onChange={(e) => updateItem(item.id, 'videoText', e.target.value)}
//                               className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CausaEditor;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback } from 'react';
import { Plus, Trash2, Save, Reply } from 'lucide-react';
import {
  doc,
  setDoc,
  getDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../Firebase/firebaseConfig';
import { Button } from '../../components/ui/Button';
import { Link } from 'react-router-dom';

type Item = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  videoText: string;
  imageUrl?: string;
  imageFile?: File;
};

type SectionData = {
  title: string;
  subtitle: string;
  items: Item[];
};

const CausaEditor = () => {
  const [sectionData, setSectionData] = useState<SectionData>({
    title: '',
    subtitle: '',
    items: []
  });

  const [isSaving, setIsSaving] = useState(false);

  const fetchData = async () => {
    const docRef = doc(db, 'OurCausa', 'data');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      setSectionData(snap.data() as any);
    }
  };

  const saveData = async () => {
    setIsSaving(true);

    const updatedItems = await Promise.all(
      sectionData.items.map(async (item) => {
        if (item.imageFile) {
          const storageRef = ref(storage, `causa/${item.id}-${item.imageFile.name}`);
          await uploadBytes(storageRef, item.imageFile);
          const downloadURL = await getDownloadURL(storageRef);

          return {
            ...item,
            imageUrl: downloadURL,
            imageFile: undefined
          };
        } else {
          return { ...item };
        }
      })
    );

    const finalData: SectionData = {
      ...sectionData,
      items: updatedItems
    };

    const docRef = doc(db, 'OurCausa', 'data');
    await setDoc(docRef, finalData, { merge: true });

    setSectionData(finalData);
    setIsSaving(false);
    alert('Contenido guardado correctamente');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addNewItem = useCallback(() => {
    const newItem: Item = {
      id: Date.now(),
      title: "Nuevo título",
      subtitle: "Nueva categoría",
      description: "Nueva descripción...",
      videoText: "Ver video",
      imageUrl: "https://via.placeholder.com/150"
    };
    setSectionData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  }, []);

  const removeItem = useCallback((id: number) => {
    setSectionData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  }, []);

  const updateItem = useCallback((id: number, field: string, value: any) => {
    setSectionData(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  const updateSectionTitle = useCallback((value: string) => {
    setSectionData(prev => ({ ...prev, title: value }));
  }, []);

  const updateSectionSubtitle = useCallback((value: string) => {
    setSectionData(prev => ({ ...prev, subtitle: value }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="">
          <Button className="ml-2 bg-red-500" >
            <Link to={'/admin'} className='flex items-center text-white'>
              <Reply />Volver
            </Link>
          </Button>
          <div className="overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg h-full">
              <div className="border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Editor de Sección</h2>
                <button
                  onClick={saveData}
                  disabled={isSaving}
                  className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 flex items-center gap-2 text-sm"
                >
                  <Save size={14} />
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>

              <div className="p-4 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">Configuración General</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Título Principal</label>
                      <input
                        type="text"
                        value={sectionData.title}
                        onChange={(e) => updateSectionTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
                      <input
                        type="text"
                        value={sectionData.subtitle}
                        onChange={(e) => updateSectionSubtitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-700">Items de Contenido</h3>
                    <button
                      onClick={addNewItem}
                      className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm"
                    >
                      <Plus size={14} />
                      Agregar
                    </button>
                  </div>

                  <div className="space-y-4 overflow-y-scroll max-h-[400px]">
                    {sectionData.items.map((item, index) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800 text-sm">Item {index + 1}</h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Título</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => updateItem(item.id, 'title', e.target.value)}
                              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Categoría/Subtítulo</label>
                            <input
                              type="text"
                              value={item.subtitle}
                              onChange={(e) => updateItem(item.id, 'subtitle', e.target.value)}
                              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Descripción</label>
                            <textarea
                              value={item.description}
                              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                              rows={2}
                              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Texto del enlace de video</label>
                            <input
                              type="text"
                              value={item.videoText}
                              onChange={(e) => updateItem(item.id, 'videoText', e.target.value)}
                              className="w-full px-2 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Imagen</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  updateItem(item.id, 'imageFile', file);
                                }
                              }}
                              className="text-sm"
                            />
                            {item.imageUrl && (
                              <img
                                src={item.imageUrl}
                                alt="Vista previa"
                                className="mt-2 max-h-40 rounded shadow-md"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CausaEditor;
