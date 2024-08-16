const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
const router = require('./Router/Router');
const cors = require('cors');
app.use(cors());
const port = 3001;
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './build/index.html'));
// });
app.use('/', router);
app.listen(port, (error) => {
  if (error) {
    console.log(`Error Occur of type`, error);
  } else console.log(`Example app listening on port ${port}`);
});
