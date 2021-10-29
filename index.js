const express = require('express');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(express.static(path.resolve(__dirname, 'public'), { extensions: ['html'] }));

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
