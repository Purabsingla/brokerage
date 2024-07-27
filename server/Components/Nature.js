const db = require('../Database/Db');

// Fetching Data from Nature table ^-^
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

//Adding Data from Nature table ^-^
const adddata = async (req, res) => {
  try {
    const get_data = req.body;
    db.run(
      'INSERT INTO Nature VALUES(?,?,?)',
      [get_data.nature, get_data.rate, get_data.calculatedby],
      (err) => {
        if (err) {
          throw err;
        } else
          console.log(
            `A row has been inserted in Nature Api data rate =  ${get_data.rate}`
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

//Updating Data from Nature table ^-^
const updatedata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(get_data);
    db.run(
      'UPDATE Nature SET nature =?, rate =? WHERE nature =?',
      [get_data.nature, get_data.rate, get_data.nature1],
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

//Deleting Data from Nature table ^-^
const deletedata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(get_data);
    db.run('DELETE FROM Nature WHERE nature =?', [get_data.nature], (err) => {
      if (err) {
        throw err;
      }
    });
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
