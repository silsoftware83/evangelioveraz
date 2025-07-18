import { useOurCauses } from "../hooks/useOurCauses";


const Causas = () => {
  const { data, loading, error } = useOurCauses();
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error.message}</div>;
  }
  if (!data) {
    return <div className="flex items-center justify-center min-h-screen text-gray-500">No data available</div>;
  }
  const causas = [
    {
      imagen: 'https://via.placeholder.com/150', // Reemplaza con la imagen correcta
      categoria: 'En Dios, esperanza',
      titulo: 'Ayudando a las personas que lo necesitan',
      descripcion: 'Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
      url:'https://www.youtube.com/watch?v=example1', // Reemplaza con la URL del video
    },
    {
      imagen: 'https://via.placeholder.com/150', // Reemplaza con la imagen correcta
      categoria: 'En la Iglesia, Dios, Niños',
      titulo: 'Enseñemos a los Niños a Amar a Dios',
      descripcion: 'Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
      url:'https://www.youtube.com/watch?v=example1', // Reemplaza con la URL del video
    },
    {
      imagen: 'https://via.placeholder.com/150', // Reemplaza con la imagen correcta
      categoria: 'En la Iglesia, Dios, Niños',
      titulo: '¿Qué tan importante es la fe?',
      descripcion: 'Lorem ipsum dolor sit Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna',
      url:'https://www.youtube.com/watch?v=example1', // Reemplaza con la URL del video
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">{data.title || "Nuestra Causa"}</h2>
        <p className="italic text-gray-600 mt-2">{data.subtitle || "Hagamos el bien"}</p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {causas.map((causa, index) => (
          <div key={index} className="text-center border-r last:border-none border-gray-300 px-4">
            <div className="flex justify-center mb-6">
              <img
                src={causa.imagen}
                alt={causa.titulo}
                className="rounded-full w-32 h-32 object-cover"
              />
            </div>
            <p className="italic text-gray-600">{causa.categoria}</p>
            <h3 className="font-bold text-gray-800 mt-4">{causa.titulo}</h3>
            <p className="text-gray-500 text-sm mt-4">{causa.descripcion}</p>
            <p className="italic text-gray-600 mt-4">Ver video</p> 
          </div>
        ))}
      </div>
    </section>
  );
};

export default Causas;
