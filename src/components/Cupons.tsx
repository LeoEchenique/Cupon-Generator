import { useEffect, useState} from "react";
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import { createCupon } from "./createCupon";
import Swal from 'sweetalert2';
import BounceLoader from "react-spinners/BounceLoader";

interface cupons{
  cupons: Icupon[]
}
interface Icupon {
  nombre: string;
  primerVencimiento:number | string ;
  segundoVencimiento:number |string ;
  tercerVencimiento:  number | string;
}

export default function Cupon( {cupons}: cupons  ) {
  const [loader, setLoader]=useState(false)
  const [existingPdfBytes, setExistingPdfBytes] = useState({})
  const [isDateAhead, setIsDateAhead]= useState(true);
  const [period, setPeriod]= useState("")
  const override: {} = {
    marginTop: "-20rem",
  };

  let zip = new JSZip();  // create an instance of Zip

  const getDocs = async () => {
    const url = '/cupon.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    setExistingPdfBytes(existingPdfBytes)
  }

  const getDate=(isAhead: boolean)=>{
    const date = new Date();
    if(isAhead) date.setMonth(date.getMonth() + 1); // one month ahead
  
    const formatFullDate = date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
    });
    let period: string = formatFullDate.replace(formatFullDate[0], formatFullDate[0].toLocaleUpperCase());
    setPeriod(period)
  }
  useEffect(() => {
      getDocs()    
      getDate(isDateAhead)
  },[isDateAhead])

  const modifyPdf = async (period: string) => { 
    if (!cupons.length) return Swal.fire("El archivo no se cargó o es inválido", undefined, "error");
    setLoader(true)
    let res =  cupons.map(async (e) =>  createCupon( existingPdfBytes, e, period)); 
    Promise.all(res).then(async (res) => OpenPDF(res))
  }

  const OpenPDF= async (blobs: Blob[]) => {
    blobs.map((blobs, i) => zip.file(`${cupons[i].nombre}.pdf`, blobs)) // add into zip instance each blob as "pdf"
    zip.generateAsync({ type: "blob" }).then(content => {
      setLoader(false)
      saveAs(content, `Cupones.zip`);  // download all
      Swal.fire("Está comenzando tu descarga", undefined, "success")
    });
  }
    return (
        <div>
        <button className="bg-amber-800 hover:bg-amber-600 text-white font-bold rounded-full h-10 pl-10 pr-10 rounded-full mr-6 " onClick={()=>modifyPdf(period)}> Generar Cupón</button>
        <select className=" border border-gray-300 rounded-full h-10 pl-5 pr-10 g-amber-800 hover:border-gray-400 focus:outline-none  " name="" id="" onChange={(e)=>{
          if(e.target.value === "true"){
             setIsDateAhead(true)
          }
          else setIsDateAhead(false)
        }}>
          <option value="true">Mes siguiente</option>
          <option value="false">Mes actual</option>
        </select>
        <BounceLoader
          loading={loader}
          color="#ffffff"
          cssOverride={override}
          size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        </div>
    )
}

