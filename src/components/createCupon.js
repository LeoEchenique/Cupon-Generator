import { degrees, grayscale, nextLine, PDFDocument, rgb, StandardFonts, values } from 'pdf-lib';
import { saveAs } from 'file-saver';
import JSZip from "jszip";
import fontkit from '@pdf-lib/fontkit';


export const createCupon = async (pdfDoc, customFont, e, period) => {  // the template instance - 

    let document = pdfDoc;

    /*    const pdfDoc = await PDFDocument.load(pdfBytes)
       pdfDoc.registerFontkit(fontkit)
       const customFont = await pdfDoc.embedFont(fontBytes) */
    const pages = document.getPages()
    const firstPage = pages[0]
    const {/*  width, */ height } = firstPage.getSize() // 841 X & 198 Y




    firstPage.drawText(`${e.Nombre}`, {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
        x: 70,
        y: height / 1.55,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })

    firstPage.drawText(`${period}`, {
        x: 70,
        y: height / 1.82,
        size: 12,
        font: customFont,
        color: grayscale(0.17)
    })

    firstPage.drawText(`10 de ${period.split(" ")[0]}`, { // first expire
        x: 100,
        y: height / 3.2,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
        x: 100,
        y: height / 4.03,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
        x: 100,
        y: height / 5.5,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })

    let venc = "1er venc";            // first mount
    firstPage.drawText(`$${e[venc]},00`, {
        x: 200,
        y: height / 3.2,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })

    let vencTwo = "2venc";            // second mount
    firstPage.drawText(`$${e[vencTwo]},00`, {
        x: 200,
        y: height / 4.03,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })
    let vencThree = "3er venc";            // third mount
    firstPage.drawText(`$${e[vencThree]},00`, {
        x: 200,
        y: height / 5.5,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })
    // second talon


    firstPage.drawText(`${e.Nombre}`, {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
        x: 350,
        y: height / 1.55,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })

    firstPage.drawText(`${period}`, {
        x: 350,
        y: height / 1.82,
        size: 12,
        font: customFont,
        color: grayscale(0.17)
    })

    firstPage.drawText(`10 de ${period.split(" ")[0]}`, { // first expire
        x: 380.5,
        y: height / 3.2,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
        x: 380.5,
        y: height / 4.03,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
        x: 380.5,
        y: height / 5.5,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    // first mount
    firstPage.drawText(`$${e[venc]},00`, {
        x: 480,
        y: height / 3.2,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })
    // second mount
    firstPage.drawText(`$${e[vencTwo]},00`, {
        x: 480,
        y: height / 4.03,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })         // third mount
    firstPage.drawText(`$${e[vencThree]},00`, {
        x: 480,
        y: height / 5.5,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })

    // third talon
    firstPage.drawText(`${e.Nombre}`, {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
        x: 630.5,
        y: height / 1.55,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })

    firstPage.drawText(`${period}`, {
        x: 630.5,
        y: height / 1.82,
        size: 12,
        font: customFont,
        color: grayscale(0.17)
    })


    firstPage.drawText(`10 de septiembre`, { // first expire
        x: 661,
        y: height / 3.2,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
        x: 661,
        y: height / 4.03,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
        x: 661,
        y: height / 5.5,
        size: 9.4,
        font: customFont,
        color: grayscale(0.17)
    })

    // first mount
    firstPage.drawText(`$${e[venc]},00`, {
        x: 761,
        y: height / 3.2,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })
    // second mount
    firstPage.drawText(`$${e[vencTwo]},00`, {
        x: 761,
        y: height / 4.03,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })         // third mount
    firstPage.drawText(`$${e[vencThree]},00`, {
        x: 761,
        y: height / 5.5,
        size: 9.5,
        font: customFont,
        color: grayscale(0.17)
    })

    const pdfTemplate = await document.save()  // save the edited pdf template as arraybBuffer 
    var blob = new Blob([pdfTemplate], { type: "application/pdf" }); // converted to Blob
    return blob

}