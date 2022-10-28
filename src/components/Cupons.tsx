import { useEffect, useState} from "react";
import { degrees, grayscale, nextLine, PDFDocument, rgb, StandardFonts, values } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import fontkit from '@pdf-lib/fontkit';
import { createCupon } from "./createCupon";


export default function Cupon({ cupons }) {

  const [existingPdfBytes, setExistingPdfBytes]= useState<ArrayBuffer>()
  const [fontBytes, setFontBytes] = useState<ArrayBuffer>()
  
  const getDocs = async () => {
    const url = '/cupon.pdf'
    const urlFont = "boldFont.ttf";
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    setExistingPdfBytes(existingPdfBytes)
    const fontBytes = await fetch(urlFont).then(res => res.arrayBuffer());
    setFontBytes(fontBytes)

  }

  useEffect(() => {
    getDocs() && console.log("initialize")
  },[])



  const modifyPdf = async () => {

    let zip = new JSZip();  // create an instance of Zip
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
     pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes)
   

    const date = new Date();
    const formatFullDate = date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
    });

    let period = formatFullDate.replace(formatFullDate[0], formatFullDate[0].toLocaleUpperCase())


    async function OpenPDF(blobs) {
      console.log("take long..")
     await blobs.map((blobs, i) => zip.file(`${cupons[i].Nombre}.pdf`, blobs))
    await  zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, `Cupones.zip`);
      });

    }

   
    let half = cupons.slice(0,30)
    console.log(half)
    let res = await half.map(async (e) => {
   //   console.log(pdfDoc, customFont, e, period, "all ")
   await createCupon( pdfDoc, customFont,  e, period)
      
    }); 
   
     Promise.all(res).then(async (res) =>  OpenPDF(res))
    
  }

 
    return (
        <div>
        <button onClick={modifyPdf}> save</button>
        
        </div>
    )
}

