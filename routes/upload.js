const path = require('path');

function routeUpload(app, folder) {
  app.post('/upload', (req, res) => {
    res.send('hi');
  });
}

module.exports = routeUpload;
