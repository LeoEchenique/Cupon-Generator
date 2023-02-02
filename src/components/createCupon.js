import { grayscale, PDFDocument, StandardFonts } from "pdf-lib";

export const createCupon = async (pdfBytes, e, period) => {
  // the template instance -

  const pdfDoc = await PDFDocument.load(pdfBytes);
  const customFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const { height } = firstPage.getSize(); // 841 X & 198 Y

  let month = period.split(" ")[0];
  let day1 = "10 de" + " ".concat(month);
  let day2 = "20 de" + " ".concat(month);
  let day3 = "30 de" + " ".concat(month);

  if (period.includes("Febrero")) day3 = "28 de" + " ".concat(month);

  firstPage.drawText(`${e.nombre}`, {
    // make funcion that reviews the length of any propoerty of cupon an throws error if excees 28!! (on alumno and periodo)
    x: 70,
    y: height / 1.55,
    size: 12,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(`${period}`, {
    x: 70,
    y: height / 1.82,
    size: 12,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(day1, {
    // first expire
    x: 100,
    y: height / 3.2,
    size: 11,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(day2, {
    // 2d expire
    x: 100,
    y: height / 4.03,
    size: 11,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(day3, {
    //third expire
    x: 100,
    y: height / 5.5,
    size: 11,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(`$${e.primerVencimiento},00`, {
    x: 200,
    y: height / 3.2,
    size: 11,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(`$${e.segundoVencimiento},00`, {
    x: 200,
    y: height / 4.03,
    size: 11,
    font: customFont,
    color: grayscale(0.17),
  });
  firstPage.drawText(`$${e.tercerVencimiento},00`, {
    x: 200,
    y: height / 5.5,
    size: 11,
    font: customFont,
    color: grayscale(0.17),
  });

  const pdfTemplate = pdfDoc
    .save() // save the edited pdf template as arraybBuffer
    .then((res) => {
      return new Blob([res], { type: "application/pdf" });
    });
  return pdfTemplate;
};
