const sql = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../mydatabase.db');
let db = new sql.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else {
    console.log('Connected to the SQLite database.');

    //Ledger Table
    db.run(
      'CREATE TABLE IF NOT EXISTS LedgerInfo (ledger TEXT, station TEXT, grop TEXT)',
      (err) => {
        if (err) console.error(err.message);
        else console.log('Table LedgerInfo created or already exists.');
      }
    );

    //Comodity Table
    db.run('CREATE TABLE IF NOT EXISTS Comodity (comodity TEXT)', (err) => {
      if (err) console.error(err.message);
      else console.log('Table Comodity created or already exists.');
    });

    //Nature Table
    db.run(
      'CREATE TABLE IF NOT EXISTS Nature (nature TEXT,rate REAL,CalculatedBy TEXT)',
      (err) => {
        if (err) console.error(err.message);
        else console.log('Table Nature created or already exists.');
      }
    );

    //Sauda Table
    db.run(
      'CREATE TABLE IF NOT EXISTS sauda (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, comodity TEXT, quantity REAL, buyer TEXT, b_rate REAL, b_nature TEXT, b_amount REAL,b_type TEXT, seller TEXT, s_rate REAL, s_nature TEXT, s_amount REAL,s_type TEXT, weigth REAL)',
      (err) => {
        if (err) console.error(err.message);
        else console.log('Table Sauda created or already exists.');
      }
    );
  }
});
module.exports = db;
