const path = require('path');
const fileUpload = require('express-fileupload');

function routeUpload(app, folder) {
  function extractItems(req) {
    if (req.files && req.files.items) {
      return Array.isArray(req.files.items) ? req.files.items : [req.files.items];
    } else {
      return [];
    }
  }

  function save(item) {
    return new Promise((resolve, reject) => {
      item.mv(path.join(folder, item.name), (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  app.use(fileUpload());

  app.post('/upload', (req, res) => {
    const items = extractItems(req);

    if (!items.length) {
      return res.redirect('/no-files');
    }

    for (const item of items) {
      save(item)
        .then(() => {
          console.log(`📗: ${item.name}`);
        })
        .catch((err) => {
          console.log(`📕: ${item.name} -> ${err}`);
        });
    }

    res.redirect('/');
  });
}

module.exports = routeUpload;
