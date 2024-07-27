const db = require('../Database/Db');

//Showing Data inform of tables ^-^
const showdata = (query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

//Adding Data to tables ^-^
const adddata = async (req, res) => {
  try {
    const get_data = req.body;
    db.run(
      'INSERT INTO LedgerInfo VALUES(?,?,?)',
      [get_data.ledger, get_data.station, get_data.group],
      (err) => {
        if (err) {
          throw err;
        } else
          console.log(
            `A row has been inserted in ledger table getdata is ${get_data.ledger}`
          );
      }
    );
    res.send({
      status: 200,
      message: 'Data added successfully',
      response: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update LedgerInfo ^-^
const updatedata = async (req, res) => {
  try {
    let Data1 = [];
    const get_data = req.body;
    console.log(get_data);
    db.run(
      'UPDATE LedgerInfo SET station =?, grop =?,ledger =? WHERE ledger =?',
      [get_data.station, get_data.group, get_data.ledger, get_data.ledger1],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    res.send({
      status: 200,
      message: 'Data updated successfully',
      response: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//delete LedgerInfo ^-^
const deletedata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(get_data, ' is Data send by frontend');
    db.run(
      'DELETE FROM LedgerInfo WHERE ledger =?',
      [get_data.ledger],
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    res.send({
      status: 200,
      message: 'Data deleted successfully',
      response: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = { showdata, adddata, updatedata, deletedata };
