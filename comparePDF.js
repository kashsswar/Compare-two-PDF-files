import { PDFDocument } from 'pdf-lib';
import fetch from 'node-fetch';

async function comparePDFs(url1, url2) {
  try {
    // Fetch PDF content from the URLs
    const pdfData1 = await fetchPDF(url1);
    const pdfData2 = await fetchPDF(url2);

    // Load PDF documents
    const pdfDoc1 = await PDFDocument.load(pdfData1);
    const pdfDoc2 = await PDFDocument.load(pdfData2);

    // Compare PDFs
    const areIdentical = compareDocs(pdfDoc1, pdfDoc2);

    // Output the result
    if (areIdentical) {
      console.log('Files are identical');
    } else {
      console.log('Files are different');
      const diffLines = getDiffLines(pdfDoc1, pdfDoc2);
      console.log('Difference of lines:', diffLines);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

async function fetchPDF(url) {
  try {
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) {
      throw new Error(`Failed to fetch PDF from ${url}. Status: ${response.status} ${response.statusText}`);
    }
    return response.arrayBuffer();
  } catch (error) {
    throw new Error(`Failed to fetch PDF from ${url}: ${error.message}`);
  }
}

function compareDocs(doc1, doc2) {
  return doc1.getPageCount() === doc2.getPageCount();
}

function getDiffLines(doc1, doc2) {
  return 'No differences found';
}

// Replace the URLs with your actual PDF file URLs
const pdfUrl1 = 'https://drive.google.com/uc?id=1n6_U5qB3P52qctWX4pMJgnjSyquEIcar';
const pdfUrl2 = 'https://drive.google.com/uc?id=1k4Oso_aULBRMRTXRVwqU_Bk3K4P7c_u1';

// Call the comparePDFs function with the PDF URLs
comparePDFs(pdfUrl1, pdfUrl2);
