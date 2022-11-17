import logo from "../assets/logo.png"

const About = () => {
  return (
    <div className="bg-zinc-800 h-[100vh] flex md:flex-row flex-col items-start md:justify-between flex-wrap">
      <div className="border-2 mt-6 md:ml-12 md:w-[35vw]  h-max">
        <h2 className="text-white text-xl ml-6">
          Para utilizar la aplicación debes:
        </h2>
        <ol className="ml-16">
          <li className="text-white text-xl mt-6 list-disc">
            Arrastrar y soltar un archivo en el cuadro
          </li>
          <li className="text-white text-lg mt-6 "> O bien...</li>
          <li className="text-white text-xl mt-6 list-disc">
            Examinar un archivo de tu directorio
          </li>
          <li className="text-white text-lg mt-6 "> Para luego: </li>
          <li className="text-white text-xl mt-6  list-disc">
            Clickear el botón y listo! Tu pdf Será codificado con éxito
          </li>
        </ol>
          </div>
          <div className="xl:block hidden">
              <img src={logo} className="w-32 h-48 md:ml-20 ml-6  rounded-lg object-contain min-h-0" alt="Santa_ines_logo" />
          </div>
      <div className="border-2 md:mr-12 md:mt-6 md:ml-12 md:w-[35vw] mt-20 md:h-max w-[94.5vw]">
        <h2 className="text-white text-xl ml-6">A tener en cuenta:</h2>
        <ol className="ml-16">
          <li className="text-white text-xl mt-6 list-disc">
            No se puede generar un pdf a partir de un archivo diferente del
            formato Excel (.xlsx)
          </li>
          <li className="text-white text-xl mt-6 list-disc">
            Para versiones antiguas de archivos Excel <i>puede no funcionar</i>
          </li>
          <li className="text-white text-xl mt-6  list-disc">
            En teoría <b>Siempre</b> la primer fila del archivo deberá
            referenciar como "titulo" de la columna entera
          </li>
          <li className="text-white text-lg mt-[1.2rem]"><i> Ej: fila 1 columna A: "Nombre" // fila 1 columna B: "Vencimiento" </i> </li>
        </ol>
          </div>
      
    </div>
  );
};

export default About;
/*     <div>
              <img src={logo} className="w-32 h-48 md:ml-20 ml-6  rounded-lg object-contain min-h-0" alt="Santa_ines_logo" />
          </div> */