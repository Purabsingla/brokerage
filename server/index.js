const express = require('express');
const app = express();
app.use(express.json());
const router = require('./Router/Router');
const cors = require('cors');
app.use(cors());
const port = 3001;
app.use('/', router);
app.listen(port, (error) => {
  if (error) {
    console.log(`Error Occur of type`, error);
  } else console.log(`Example app listening on port ${port}`);
});
