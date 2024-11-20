const fs = require('fs');
const PDFDocument = require('pdfkit');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        generatePDF({ results, outputPath }) {
          return new Promise((resolve, reject) => {
            // Dizin var mı kontrol et, yoksa oluştur
            const directory = outputPath.substring(0, outputPath.lastIndexOf('/'));
            if (!fs.existsSync(directory)) {
              fs.mkdirSync(directory, { recursive: true });
            }

            const doc = new PDFDocument();
            const writeStream = fs.createWriteStream(outputPath);

            doc.pipe(writeStream);

            doc.fontSize(16).text('Cypress Test Results', { align: 'center' });
            doc.moveDown();

            results.forEach((result, index) => {
              doc.fontSize(12).text(`${index + 1}. Test Name: ${result.name}`);
              doc.text(`   Status: ${result.status}`);
              doc.text(`   Duration: ${result.duration} ms`);
              doc.moveDown();
            });

            doc.end();

            writeStream.on('finish', () => resolve(null));
            writeStream.on('error', reject);
          });
        },
      });
    },
  },
};
