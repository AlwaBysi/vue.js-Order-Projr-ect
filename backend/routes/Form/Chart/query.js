var connection = require('../../../connect');

function getOrders (req, res, next) {
  connection.query('SELECT idCake, MONTH(Data), SUM(Weight) FROM Orders GROUP BY idCake, MONTH(Data)', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.status(200).send(rows);

  });
}

module.exports = {
  getOrders: getOrders
}