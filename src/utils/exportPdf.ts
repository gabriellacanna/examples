import jsPDF, { HTMLOptions } from "jspdf";
import html2canvas from "html2canvas";

export default async (fileName: string) => {
  const pdf = new jsPDF({
    orientation: "p",
    unit: "pt",
    format: [816, 1057],
    compress: true,
  });

  const doc = document.documentElement.cloneNode(true) as HTMLElement;

  const imagesIntheDocumentCloned = doc.querySelectorAll("img");

  doc.querySelectorAll("button").forEach((button) => button.remove());
  doc.querySelectorAll(".pdf-remove").forEach((text) => text.remove());

  doc.style.width = "880pt";
  doc.style.height = "auto";
  doc.style.marginTop = "10pt";
  doc.style.marginLeft = "10pt";

  const options: HTMLOptions = {
    autoPaging: "text",
    html2canvas: {
      scale: 0.68,
    },
  };

  pdf.setFontSize(8);
  pdf.text(`Boa Vista | an Equifax Company`, 600, 0);

  const imagesInTheDocument = document.querySelectorAll(".show-in-pdf");
  let imagesCount = 0;

  for (const i in imagesInTheDocument) {
    imagesCount++;

    // @ts-expect-error sa Docs
    await html2canvas(imagesInTheDocument[i])
      .then(async (canvas) => {
        imagesIntheDocumentCloned[i].setAttribute(
          "src",
          canvas.toDataURL("image/svg")
        );

        if (imagesCount === imagesInTheDocument.length) {
          await pdf.html(doc, options);
          pdf.save(`ICBOX-PF-Consulta-${fileName}.pdf`);
        }
      })
      .catch((err) => {
        return err;
      });
  }
};
