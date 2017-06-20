var connection = require('../../../connect');

function allProducts (req, res, next) {
  connection.query('SELECT * FROM Store', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (rows.length) {
      res.status(200).send(rows);
    }

  });
}

function changeProducts (req, res, next) {
  connection.query(
    'UPDATE Store SET unit="' + req.param('unit', null) + '", quantity="' + req.param('quantity', null) + '" WHERE ingredient = "' + req.param('product', null) + '"',
    function (err, rows, fields) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

      connection.query('SELECT * FROM Store', function (err, rows, fields) {
        if (rows.length) {
          res.status(200).send(rows);
        }
      })

  });
}

module.exports = {
  allProducts: allProducts,
  changeProducts: changeProducts
}
