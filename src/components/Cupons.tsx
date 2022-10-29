import { useEffect, useState} from "react";
import { saveAs } from 'file-saver';
import JSZip from "jszip";

import { createCupon } from "./createCupon";


export default function Cupon({ cupons }) {
  const [loader, setLoader]=useState(false)
  const [existingPdfBytes,setExistingPdfBytes]= useState({})
  let zip = new JSZip();  // create an instance of Zip

  const getDocs = async () => {
    const url = '/cupon.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    setExistingPdfBytes(existingPdfBytes)
  }

  useEffect(() => {
    getDocs() && console.log("initialize")
    
  },[])

  const date = new Date();
  const formatFullDate = date.toLocaleDateString("es-AR", {
    year: "numeric",
    month: "long",
  });

  let period = formatFullDate.replace(formatFullDate[0], formatFullDate[0].toLocaleUpperCase())

  const modifyPdf = async (period) => { 

    setLoader(true)
    let res =  cupons.map(async (e) =>  createCupon( existingPdfBytes, e, period)); 
    Promise.all(res).then(async (res) =>   OpenPDF(res))
  }

  const OpenPDF= async (blobs) => {
   
    blobs.map((blobs, i) => zip.file(`${cupons[i].Nombre}.pdf`, blobs)) // add into zip instance each blob as "pdf"
    zip.generateAsync({ type: "blob" }).then(content => {
      setLoader(false)
      saveAs(content, `Cupones.zip`);  // download all
    });

  }
 
    return (
        <div>
        <button onClick={()=>modifyPdf(period)}> save</button>
        {loader ? <h1>CARGANDOOOOOOOOOOOOOO</h1> : <h1>goo</h1>}
        </div>
    )
}

