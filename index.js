const express = require('express');
const path = require('path');
const routeUpload = require('./routes/upload');
require('dotenv').config();

const PORT = process.env.PORT;
const FOLDER = process.env.FOLDER;

const app = express();

app.use(express.static(path.resolve(__dirname, 'public'), { extensions: ['html'] }));
app.use(express.urlencoded({ extended: true }));

routeUpload(app, FOLDER);

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
