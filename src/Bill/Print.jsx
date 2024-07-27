// src/App.js
import React, { useState } from 'react';
import ReactPDF from '@react-pdf/renderer';
import PdfDocument from '../PDF/PdfGenerator';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Print = ({ SearchData, Data }) => {
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [Dalali, setDalali] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
    setDalali(Data.reduce((sum, current) => sum + current.amount, 0));
  };

  const handleClose = () => {
    setOpen(false);
  };
  const generateAndOpenPdf = async () => {
    // Generate the PDF and create a Blob URL
    const pdfBlob = await ReactPDF.pdf(
      <PdfDocument records={SearchData} Data={Data} />
    ).toBlob();
    const newBlobUrl = URL.createObjectURL(pdfBlob);
    console.log('Generated new Blob URL:', newBlobUrl);
    // Open the new Blob URL in a new tab
    window.open(newBlobUrl);

    // Clean up the previous Blob URL if it exists
    if (pdfBlobUrl) {
      console.log('Revoking old Blob URL:', pdfBlobUrl);
      let text = URL.revokeObjectURL(pdfBlobUrl);
      console.log(text);
    }

    // Update the state with the new Blob URL

    setPdfBlobUrl(newBlobUrl);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={generateAndOpenPdf}
        size="large"
        sx={{ marginRight: 20 }}
      >
        Generate and Open PDF
      </Button>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginRight: 13, padding: 1 }}
      >
        TOTAL DALALI
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: 20, fontWeight: 'bold' }}
        >
          Total Dalali of {SearchData.name} from {SearchData.start_date} and{' '}
          {SearchData.end_date}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: 20,
              display: 'flex',
              justifyContent: 'center',
              color: 'black',
              fontWeight: 900,
            }}
          >
            {Dalali.toFixed(5)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>DONE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Print;
