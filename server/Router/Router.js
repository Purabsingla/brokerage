const Express = require('express');
const router = Express.Router();
const { adddata, updatedata, deletedata } = require('../Components/Ledger');
const show = require('../Components/Ledger');
const nature = require('../Components/Nature');
const como = require('../Components/Comodity');
const sauda = require('../Components/Sauda');

router.get('/ledger', async (req, res) => {
  try {
    const query = 'SELECT * FROM LedgerInfo';
    const rows = await show.showdata(query, []);
    console.log(rows);
    res.send({
      status: 200,
      Data: rows,
      response: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/ledger', adddata);
router.put('/ledger', updatedata);
router.delete('/ledger', deletedata);

//Nature Router
router.get('/nature', async (req, res) => {
  try {
    const query = 'SELECT * FROM Nature';
    const rows = await nature.fetchdata(query, []);
    console.log(rows);
    res.send({
      status: 200,
      Data: rows,
      response: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/nature', nature.adddata);
router.put('/nature', nature.updatedata);
router.delete('/nature', nature.deletedata);

//Comodity Router
router.get('/comodity', async (req, res) => {
  try {
    const query = 'SELECT * FROM Comodity';
    const rows = await como.fetchdata(query, []);
    console.log(rows);
    res.send({
      status: 200,
      Data: rows,
      response: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/comodity', como.adddata);
router.put('/comodity', como.updatedata);
router.delete('/comodity', como.deletedata);

//Sauda Router
router.get('/sauda', async (req, res) => {
  try {
    const query = 'SELECT * FROM sauda';
    const rows = await sauda.fetchdata(query, []);
    // console.log(rows);
    res.send({
      status: 200,
      Data: rows,
      response: true,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post('/sauda', sauda.adddata);
router.put('/sauda', sauda.updatedata);
router.delete('/sauda', sauda.deletedata);

//fetching All Data from Tables
router.get('/all', async (req, res) => {
  try {
    const query = [
      'SELECT * FROM sauda',
      'SELECT * FROM Comodity',
      'SELECT * FROM Nature',
      'SELECT * FROM LedgerInfo',
    ];
    const rows = await sauda.fetchdata(query[0], []);
    const como1 = await como.fetchdata(query[1], []);
    const nature1 = await nature.fetchdata(query[2], []);
    const ledger = await show.showdata(query[3], []);
    console.log('Data Fetched Sucessfully');
    console.log(como1, " is comodity's data from backend side");
    res.send({
      status: 200,
      Sauda: rows,
      Comodity: como1,
      Nature: nature1,
      Ledger: ledger,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//fetching data from sauda in limitation
router.post('/saudaAll', async (req, res) => {
  try {
    const getData = req.body;
    console.log(getData);
    const query = `SELECT id, date, comodity, quantity, seller AS party, s_rate AS rate, s_amount AS amount, s_type AS type FROM sauda WHERE buyer='${getData.name}' AND date BETWEEN '${getData.start_date}' AND '${getData.end_date}'`;
    const query2 = `SELECT id, date, comodity, quantity, buyer AS party, b_rate AS rate, b_amount AS amount, b_type AS type FROM sauda WHERE seller='${getData.name}' AND date BETWEEN '${getData.start_date}' AND '${getData.end_date}' `;
    const saudaa = await sauda.fetchdata(query, []);
    const saudab = await sauda.fetchdata(query2, []);
    const Sauda = [...saudaa, ...saudab];
    console.log('data is comming from Sauda');
    if (Sauda.length > 0) {
      res.send({
        status: 200,
        Sauda: Sauda,
        response: true,
      });
    } else {
      res.send({
        status: 400,
        response: false,
        message: 'Not Found',
      });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
module.exports = router;
