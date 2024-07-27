import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  table: {
    display: 'table',
    width: 'auto',
    margin: '0 auto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '16.7%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    padding: 5,
    fontSize: 8,
  },
  tableCol2: {
    width: '66.7%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
});

export default function Footer({ AmountTotal, QuantityTotal }) {
  return (
    <>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol2}>
            <Text style={styles.tableCell}>TOTAL</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{QuantityTotal.toFixed(5)}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{AmountTotal.toFixed(5)}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
