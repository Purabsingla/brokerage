// src/PdfDocument.js
import React from 'react';
import { Document, Page, View, StyleSheet } from '@react-pdf/renderer';
import Header from './HeaderPdf';
import InvoiceTable from './PdfTable';
import Footer from './Footer';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    marginLeft: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  record: {
    marginBottom: 10,
  },
});
// <Text style={styles.header}>Headerrrrr IS HERE</Text>
const PdfDocument = ({ records, Data }) => {
  const itemsPerPage = 29; // Adjust this value based on your layout
  const pages = Math.ceil(Data.length / itemsPerPage);
  let AmountTotal = 0;
  let QuantityTotal = 0;

  return (
    <Document>
      {Array.from({ length: pages }, (_, i) => {
        const pageItems = Data.slice(i * itemsPerPage, (i + 1) * itemsPerPage);
        const pageTotal = pageItems.reduce((acc, item) => acc + item.amount, 0);
        const qntlTotal = pageItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        AmountTotal += pageTotal;
        QuantityTotal += qntlTotal;

        return (
          <Page key={i} style={styles.page}>
            <Header SearchData={records} />
            <InvoiceTable items={pageItems} />
            {i === pages - 1 && (
              <View style={styles.footer}>
                <Footer
                  QuantityTotal={QuantityTotal}
                  AmountTotal={AmountTotal}
                />
              </View>
            )}
          </Page>
        );
      })}
    </Document>
  );
};

export default PdfDocument;
