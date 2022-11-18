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

  const override: {} = {
    marginTop: "-20rem",
  };

  let zip = new JSZip();  // create an instance of Zip

  const getDocs = async () => {
    const url = '/cupon.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    setExistingPdfBytes(existingPdfBytes)
  }

  useEffect(() => {
      getDocs()    
    
  },[])

  const date = new Date();
  date.setMonth(date.getMonth() + 1); // one month ahead

  const formatFullDate = date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
  });
  
  let period: string = formatFullDate.replace(formatFullDate[0], formatFullDate[0].toLocaleUpperCase());

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
        <div className="md:-mt-10 sm:-mt-20 h-[120px] ">
        <button className="bg-amber-800 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded" onClick={()=>modifyPdf(period)}> save</button>
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

