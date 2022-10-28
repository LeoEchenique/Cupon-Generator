import { useEffect, useState} from "react";
import { degrees, grayscale, nextLine, PDFDocument, rgb, StandardFonts, values } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import fontkit from '@pdf-lib/fontkit';
import { createCupon } from "./createCupon";


export default function Cupon({ cupons }) {

  const [existingPdfBytes,setExistingPdfBytes]= useState({})
  const [fontBytes, setFontBytes] = useState({})
  const [pdfDoc, setPdfDoc]= useState({})
  const [customFont,setCustomFont]= useState({})
  const getDocs = async () => {
    const url = '/cupon.pdf'
    const urlFont = "boldFont.ttf";
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const fontBytes = await fetch(urlFont).then(res => res.arrayBuffer());
    setExistingPdfBytes(existingPdfBytes)
    setFontBytes(fontBytes)
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    setPdfDoc(pdfDoc)
     pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes)
    setCustomFont(customFont)
  }

  useEffect(() => {
    getDocs() && console.log("initialize")
  },[])



  const modifyPdf = async () => {

    let zip = new JSZip();  // create an instance of Zip


    const date = new Date();
    const formatFullDate = date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
    });

    let period = formatFullDate.replace(formatFullDate[0], formatFullDate[0].toLocaleUpperCase())


    async function OpenPDF(blobs) {
    
      blobs.map((blobs, i) => zip.file(`${cupons[i].Nombre}.pdf`, blobs))
      zip.generateAsync({ type: "blob" }).then(content => {
   
        saveAs(content, `Cupones.zip`);
      });

    }


   
    let res =  cupons.map(async (e) =>  createCupon( existingPdfBytes, fontBytes,  e, period)); 

     Promise.all(res).then(async (res) =>   OpenPDF(res))
    
  }

 
    return (
        <div>
        <button onClick={modifyPdf}> save</button>
        
        </div>
    )
}

