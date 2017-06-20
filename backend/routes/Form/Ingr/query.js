var connection = require('../../../connect');

function getIngr (req, res, next) {
  connection.query('SELECT idIngr, MONTH(Date), SUM(Quantity) FROM feature_ingr GROUP BY idIngr, MONTH(Date)', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);



    res.status(200).send(rows);

  });
}

module.exports = {
  getIngr: getIngr
}