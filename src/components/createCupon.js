import { grayscale, PDFDocument, StandardFonts } from 'pdf-lib';

export const createCupon = async (pdfBytes, e, period) => {  // the template instance - 

    const pdfDoc = await PDFDocument.load(pdfBytes)

    const customFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { height } = firstPage.getSize() // 841 X & 198 Y

    firstPage.drawText(`${e.nombre}`, {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
        x: 70,
        y: height / 1.55,
        size: 12,
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
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
        x: 100,
        y: height / 4.03,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
        x: 100,
        y: height / 5.5,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })


    firstPage.drawText(`$${e.primerVencimiento},00`, {
        x: 200,
        y: height / 3.2,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })

    firstPage.drawText(`$${e.segundoVencimiento},00`, {
        x: 200,
        y: height / 4.03,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`$${e.tercerVencimiento},00`, {
        x: 200,
        y: height / 5.5,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    // second talon


    firstPage.drawText(`${e.nombre}`, {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
        x: 350,
        y: height / 1.55,
        size: 12,
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
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
        x: 380.5,
        y: height / 4.03,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
        x: 380.5,
        y: height / 5.5,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    // first mount
    firstPage.drawText(`$${e.primerVencimiento},00`, {
        x: 480,
        y: height / 3.2,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    // second mount
    firstPage.drawText(`$${e.segundoVencimiento},00`, {
        x: 480,
        y: height / 4.03,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })         // third mount
    firstPage.drawText(`$${e.tercerVencimiento},00`, {
        x: 480,
        y: height / 5.5,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })

    // third talon
    firstPage.drawText(`${e.nombre}`, {  // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
        x: 630.5,
        y: height / 1.55,
        size: 12,
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


    firstPage.drawText(`10 de ${period.split(" ")[0]}`, { // first expire
        x: 661,
        y: height / 3.2,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`20 de ${period.split(" ")[0]}`, { // 2d expire 
        x: 661,
        y: height / 4.03,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    firstPage.drawText(`30 de ${period.split(" ")[0]}`, { //third expire
        x: 661,
        y: height / 5.5,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })

    // first mount
    firstPage.drawText(`$${e.primerVencimiento},00`, {
        x: 761,
        y: height / 3.2,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    // second mount
    firstPage.drawText(`$${e.segundoVencimiento},00`, {
        x: 761,
        y: height / 4.03,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })         // third mount
    firstPage.drawText(`$${e.tercerVencimiento},00`, {
        x: 761,
        y: height / 5.5,
        size: 11,
        font: customFont,
        color: grayscale(0.17)
    })
    const pdfTemplate = pdfDoc.save()  // save the edited pdf template as arraybBuffer 
        .then(res => {
            return new Blob([res], { type: "application/pdf" });

        })
    //  let blob = new Blob([pdfTemplate], { type: "application/pdf" }); // converted to Blob
    return pdfTemplate

}