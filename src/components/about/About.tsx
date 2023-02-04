import logo from "../../assets/logo.png"
import Nav from "../nav/Nav";
import { getAuth } from "firebase/auth";
import {useEffect, useState} from "react";

const About = () => {

  const [user,setUser]=useState("");

  useEffect(()=>{
    const auth= getAuth();
    const user: any = auth.currentUser;
    if(user)  setUser(user.accessToken);
  },[])
  return (
    <>
     <Nav token={user?.length? user : null}/>
    <div className="bg-zinc-800 h-max sm:h-[100vh] flex xl:flex-row  flex-col items-start justify-evenly gap-2 ">
     
      <div className="md:ml-32 md:mt-24 xl:w-2/6   ">
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
            Clickear el botón y listo! Todos tus pdf Serán codificados con éxito
          </li>
        </ol>
          </div>
          <div className="xl:flex items-center  justify-center   xl:w-2/6  mt-32 hidden">
              <img src={logo} className="w-32 h-48  rounded-lg ml-36   object-contain min-h-0" alt="Santa_ines_logo" />
          </div>
      <div className="md:ml-32 md:mt-24 xl:w-3/6 xl:mr-12">
        <h2 className="text-white text-xl ml-6 ">A tener en cuenta:</h2>
        <ol className="ml-16">
          <li className="text-white text-xl mt-6 list-disc">
            No se puede generar un pdf a partir de un archivo diferente del
            formato Excel (.xlsx)
          </li>
          <li className="text-white text-xl mt-6 list-disc">
           Se genera la fecha UN MES POSTERIOR al actual <i>(si estamos en enero, los cupones salen con fecha de febrero) </i>
          esto puede cambiarse para el mes ACTUAL 
          </li>
          <li className="text-white text-xl mt-6 list-disc">
           Los cupones salen automáticamente con fecha de vencimiento 10 - 20 - 30 de cada mes
          </li>
          <li className="text-white text-xl mt-6  list-disc">
            En teoría <b>Siempre</b> la primer fila del archivo deberá
            referenciar como "titulo" de la columna entera
          </li>
          <li className="text-white text-lg mt-[1.2rem]"><i> Ej: fila 1 columna A: "Nombre" // fila 1 columna B: "Vencimiento" </i> </li>
        </ol>
          </div>
      
    </div>
    </>
  );
};

export default About;
