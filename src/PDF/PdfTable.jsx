import { Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
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
  tableCellHeader: {
    backgroundColor: '#E4E4E4',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 5,
    fontSize: 8,
  },
});

const InvoiceTable = ({ items }) => {
  return (
    <View style={styles.table}>
      {/* Table Header */}
      <View style={styles.tableRow}>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Date</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Party</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Comodity</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Rate</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Bags/Qntl</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCellHeader}>Dalali Amt</Text>
        </View>
      </View>
      {/* Table Rows */}
      {items.map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.date}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.party}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.comodity}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.rate}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.quantity}</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{item.amount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};
export default InvoiceTable;
