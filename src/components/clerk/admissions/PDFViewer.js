import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Button } from '@mui/material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  return (
    <>
      <div style={{ flexGrow: 1, overflow: 'auto' }}>
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button 
          disabled={pageNumber <= 1} 
          onClick={() => changePage(-1)}
        >
          Previous
        </Button>
        <span style={{ margin: '0 1rem', alignSelf: 'center' }}>
          Page {pageNumber} of {numPages || '--'}
        </span>
        <Button 
          disabled={pageNumber >= (numPages || 0)} 
          onClick={() => changePage(1)}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default PDFViewer;