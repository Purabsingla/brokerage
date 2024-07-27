const db = require('../Database/Db');

// Fetching Data from Comodity table ^-^
const fetchdata = (query, params) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

//Adding Data from Comodity table ^-^
const adddata = async (req, res) => {
  try {
    const get_data = req.body;
    db.run('INSERT INTO Comodity VALUES(?)', [get_data.comodity], (err) => {
      if (err) {
        throw err;
      } else
        console.log(`data is inserted with get_data is ${get_data.comodity}`);
    });
    res.send({
      status: 200,
      message: 'Data added successfully',
      response: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//Updating Data from Comodity table ^-^
const updatedata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(get_data);
    db.run(
      'UPDATE Comodity SET comodity =? WHERE comodity =?',
      [get_data.comodity, get_data.comodity1],
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

//Deleting Data from Comodity table ^-^
const deletedata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(get_data);
    db.run(
      'DELETE FROM Comodity WHERE comodity =?',
      [get_data.comodity],
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

module.exports = { fetchdata, adddata, updatedata, deletedata };
