require('dotenv').config();
const express = require('express');
const path = require('path');
const qrcode = require('qrcode-terminal');
const routeUpload = require('./routes/upload');
const ipResolver = require('./src/ip-resolver');

const FOLDER = process.env.FOLDER;
const NETWORK = process.env.NETWORK;
const PORT = process.env.PORT;

const ip = NETWORK ? ipResolver.network(NETWORK) : ipResolver.primary(ipResolver.eth);
const app = express();

app.use(express.static(path.resolve(__dirname, 'public'), { extensions: ['html'] }));
app.use(express.urlencoded({ extended: true }));

routeUpload(app, FOLDER);

app.listen(PORT, () => {
  console.clear();
  qrcode.generate(`http://${ip}:${PORT}`, { small: true });
  console.log(`\nScan the QR Code OR go to ${ip}:${PORT} on your browser.`);
  console.log(`\nUploads:\n`);
});
