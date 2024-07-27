const db = require('../Database/Db');

// Fetching Data from Sauda table ^-^

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

// Adding Data from Sauda table ^-^
const adddata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(get_data);
    db.run(
      'INSERT INTO sauda VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [
        get_data.date,
        get_data.comodity,
        get_data.quantity,
        get_data.buyer,
        get_data.brate,
        get_data.bnature,
        get_data.bamount,
        get_data.btype,
        get_data.seller,
        get_data.srate,
        get_data.snature,
        get_data.samount,
        get_data.stype,
        get_data.weigth,
      ],
      (err) => {
        if (err) {
          throw err;
        } else {
          console.log('Data Saved Sucessfully on Server Side');
        }
      }
    );
    res.send({
      status: 200,
      message: 'Data added successfully',
      response: true,
    });
  } catch (err) {
    res.send({
      status: 400,
      message: err.message,
    });
  }
};

//Updating data from sauda table
const updatedata = async (req, res) => {
  try {
    const get_data = req.body;
    console.log(
      get_data.id,
      ' is date we want to update and Weigth is ' + get_data.weight
    );
    db.run(
      'UPDATE sauda SET date = ?,comodity = ?,quantity = ?,buyer = ?,b_rate = ?,b_nature = ?,b_amount = ?,seller = ?, s_rate = ?,s_nature = ?,s_amount = ?,weigth = ? WHERE id = ?',
      [
        get_data.date,
        get_data.comodity,
        get_data.quantity,
        get_data.buyer,
        get_data.brate,
        get_data.bnature,
        get_data.bamount,
        get_data.seller,
        get_data.srate,
        get_data.snature,
        get_data.samount,
        get_data.weight,
        get_data.id, // Use the id for the WHERE clause
      ],
      function (err) {
        if (err) {
          console.log('Error aagyi bhaiya');
          throw err;
        } else console.log('Update Sucessfully i think <()>');
      }
    );
    res.send({
      status: 200,
      message: 'Data updated successfully',
      response: true,
    });
  } catch (err) {
    res.send({
      status: 400,
      message: err.message,
    });
  }
};

// Deleting data from sauda table
const deletedata = async (req, res) => {
  try {
    const id = req.body.id;
    db.run('DELETE FROM sauda WHERE id=?', [id], (err) => {
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
    res.send({
      status: 400,
      message: err.message,
    });
  }
};

module.exports = { fetchdata, deletedata, adddata, updatedata };
