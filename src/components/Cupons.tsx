import React from "react";
import { degrees, grayscale, nextLine, PDFDocument, rgb, StandardFonts, values } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import fontkit from '@pdf-lib/fontkit';


export default function Cupon({ cupons }) {
  

  const date = new Date();
  const formatFullDate = date.toLocaleDateString("es-AR", {
    year:"numeric",
    month: "long", 
  });
  
  let period= formatFullDate.replace(formatFullDate[0], formatFullDate[0].toLocaleUpperCase())
  
  if (cupons.length) {   // thks to this know we know the max character to a name to display properly (28)  TODO: a function wich replaces excedent character with (".")
    let mostLength;
    let res = cupons.map(e => e.Nombre).reduce((prev, current) => {

      return prev.length >= current.length ? mostLength = prev : mostLength = current
    })
    if (mostLength?.length >= 27) {   // this would be usefull to test the Nombre max character (28) for each name and in case of excess, slice it.
      let slice = 28;       // this should be on APP component to pass the cupons with all the data processed correctly. (like the editPrice process)
      let checkVocals = ["A,E,I,O,U"]
      let checked= checkVocals.map((e)=> e.includes(mostLength[slice]))
      checked ?  mostLength =  mostLength.slice(0,slice).concat("",".") : console.log(slice, "hi!")
    }

  }


  


  const modifyPdf = async () => {
    const url = '/cupon.pdf'
    const urlFont = "boldFont.ttf";
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    
    const fontBytes= await fetch(urlFont).then(res=> res.arrayBuffer());

    

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    pdfDoc.registerFontkit(fontkit)
    const customFont = await pdfDoc.embedFont(fontBytes)
    
    
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const {/*  width, */ height } = firstPage.getSize() // 841 X & 198 Y
    
    firstPage.drawText('MARRA TURELLI IRINA Y REBECA', {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
      x: 70 ,
      y: height / 1.55,
      size: 11,
      font: customFont,
      color: grayscale(0.17)
    })

    firstPage.drawText(`${period}`, {
      x: 70 ,
      y: height / 1.82,
      size: 12,
      font: customFont,
      color: grayscale(0.17)
    })

    firstPage.drawText(`10 de ${period.split(" ")[0]}`, { // first expire
      x: 100 ,
      y: height / 3.2,
      size: 9.4,
      font: customFont,
      color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
      x: 100 ,
      y: height / 4.03,
      size: 9.4,
      font: customFont,
      color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
      x: 100 ,
      y: height / 5.5,
      size: 9.4,
      font: customFont,
      color: grayscale(0.17)
    }) 

    let venc = "1er venc";            // first mount
    firstPage.drawText(`$${cupons[0][venc]},00`, {
      x: 200 ,
      y: height / 3.2,
      size: 9.5,
      font: customFont,
      color: grayscale(0.17)
    })

    let vencTwo = "2venc";            // second mount
    firstPage.drawText(`$${cupons[0][vencTwo]},00`, {
      x: 200 ,
      y: height / 4.03,
      size:9.5,
      font: customFont,
      color: grayscale(0.17)
    })
    let vencThree= "3er venc";            // third mount
    firstPage.drawText(`$${cupons[0][vencThree]},00`, {
      x: 200 ,
      y: height / 5.5,
      size: 9.5,
      font: customFont,
      color: grayscale(0.17)
    })

    const pdfTemplate = await pdfDoc.save()  // save the edited pdf template as arraybBuffer 
    let zip = new JSZip();  // create an instance of Zip

    function OpenPDF(pdfTemplate) {  // will take the arrayBuffer and the array
      var blob = new Blob([pdfTemplate], { type: "application/pdf" }); // converted to Blob

      let url= URL.createObjectURL(blob)
      console.log(zip, "first")
      zip.file(`dot.pdf`, blob) //--> save the file as pdf && the data that will be stored will be the blob
  
      window.open(url) 

    }

    OpenPDF(pdfTemplate)
    // cupons.map(e=> OpenPDF(pdfTemplate, e)); // e must be an array of an interface instances (Icupon[] for example)
    // OpenPDF(pdfTemplate)
    // zip.generateAsync({ type: "blob" }).then(content => { 
    //   // console.log(zip, "after")
    //   saveAs(content, `Cupones.zip`);
    // });                                       //---> nice! u have for each row in the excel a pdf file with dinamic name, to do: edit the pdf with dinamic data
    console.log(zip, "zip")
    // when map need to pass pdfTemplate and element to make dinamic pdf cupons and THEN save it all in a zip file
    
  }
 
    return (
        <div>
        <button onClick={modifyPdf}> save</button>
        
        </div>
    )
}

