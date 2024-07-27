import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'column',
    marginLeft: 160,
  },
  headerRight: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginRight: 20,
  },
  subtitle: {
    fontSize: 12,
  },
  headerCenter: {
    flexDirection: 'column',
  },
  headerSecond: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subtitle2: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 3,
    fontWeight: 900,
  },
  subtitle23: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 3,
    fontWeight: 900,
    marginLeft: 25,
  },
});

export default function Header({ SearchData }) {
  const name = SearchData.name;
  const start_date = SearchData.start_date;
  const end_date = SearchData.end_date;
  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>BALAJI CANVASSERS</Text>
          <Text style={styles.subtitle}>
            &nbsp;&#09;&#09;&#09;&#09;&#09;&#09;&#09;Oil, Oil Seed, Oil Cake &
            Grain Etc.
          </Text>
          <Text style={styles.subtitle}>
            Shivaji Colony, Near Chaudhary Nursing Home,
          </Text>
          <Text style={styles.subtitle}>
            &nbsp; &emsp; &#09;&#09;&#09;&#09;&#09;&#09;&#09;&#09; Janta Bhawan
            Road, Sirsa
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Text style={styles.subtitle}>Mobile No.</Text>
          <Text style={styles.subtitle}>9215145939</Text>
          <Text style={styles.subtitle}>9215781939</Text>
        </View>
      </View>
      <View style={styles.headerSecond}>
        <View style={styles.headerCenter}>
          <Text style={styles.subtitle23}>{name}</Text>
          <Text style={styles.subtitle2}>
            FROM {start_date} TO {end_date}
          </Text>
        </View>
      </View>
    </>
  );
}
