import React from "react";
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import { fileURLToPath } from "url";



export default function Cupon({ cupons }) {
    
  const modifyPdf = async () => {
    const url = '/cupon.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()

    firstPage.drawText('MARIA FERNANDA DEL VALLE PORONGA', {
      x: 75,
      y: height / 1.55,
      size: 10,
      font: helveticaFont,
     /*  rotate: degrees(-45), */
    })
    const pdfTemplate = await pdfDoc.save()  // save the edited pdf template as arraybBuffer 
    let zip = new JSZip();  // create an instance of Zip

    function OpenPDF(pdfTemplate, e) {  // will take the arrayBuffer and the array
      var blob = new Blob([pdfTemplate], { type: "application/pdf" }); // converted to Blob

      let url= URL.createObjectURL(blob)
      console.log(zip, "first")
      zip.file(`${e.Nombre}.pdf`, blob) //--> save the file as pdf && the data that will be stored will be the blob
   /* 
      window.open(url) */

    }
    cupons.map(e=> OpenPDF(pdfTemplate, e)); // e must be an array of an interface instances (Icupon[] for example)
    // OpenPDF(pdfTemplate)
    zip.generateAsync({ type: "blob" }).then(content => { 
      // console.log(zip, "after")
      saveAs(content, `Cupones.zip`);
    });                                       //---> nice! u have for each row in the excel a pdf file with dinamic name, to do: edit the pdf with dinamic data
    console.log(zip, "zip")
    // when map need to pass pdfTemplate and element to make dinamic pdf cupons and THEN save it all in a zip file
    
  }
 
    return (
        <div>
        <button onClick={modifyPdf}> save</button>
        
        </div>
    )
}

