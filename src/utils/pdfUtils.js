import jsPDF from 'jspdf';

/** Generate PDF from coins list **/
export const generateCoinsPDF = (coins) => {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text('My Coin Collection', 10, 10);

  doc.setFontSize(10);

  let y = 20;

  coins.forEach((coin, index) => {
    doc.text(
      `${index + 1}. ${coin.place} | ${coin.model} | ${coin.year}`,
      10,
      y
    );

    y += 6;

    // Page break
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
  });

  doc.save('coins.pdf');
};