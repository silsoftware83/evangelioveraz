

const FraseConNewsletter = () => {
  return (
    <div className="w-full">
      {/* Sección de fondo con imagen */}
      <div
        className="bg-cover bg-center flex flex-col justify-center items-center text-white text-center py-32 px-4"
        style={{
          backgroundImage: "url('https://api.algobook.info/v1/randomimage?category=places')", // Reemplaza este link con tu imagen real
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold max-w-2xl leading-snug">
          “No le digas a Dios cuán grande es tu tormenta, dile a la tormenta cuán grande es tu Dios.”
        </h2>
        <div className="mt-6">
          <p className="font-semibold">Simon R. Green</p>
          <p className="text-sm italic">Voluntario</p>
        </div>
      </div>

      {/* Sección de suscripción */}
      <div className="bg-[#2C2352] text-white py-10 px-6 flex flex-col items-center">
        <p className="text-center text-sm italic max-w-xl mb-6">
          Reciba actualizaciones periódicas por correo electrónico del Pastor Doe y otros ministerios de la Casa del Señor. 
          ¡Le mantenemos al tanto para que no se lo pierda!
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md">
          <input
            type="email"
            placeholder="your mail address..."
            className="w-full px-4 py-2 rounded-full text-gray-700 outline-none"
          />
          <button className="bg-white text-[#2C2352] font-bold px-6 py-2 rounded-full whitespace-nowrap">
            SUBSCRIBE
          </button>
        </div>
      </div>
    </div>
  );
};

export default FraseConNewsletter;
