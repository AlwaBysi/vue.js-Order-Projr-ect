var connection = require('../../../connect');
var moment = require('moment');


function getWeight (req, res, next) {
  connection.query('SELECT price1kg FROM Cakes WHERE idCake = "' + req.query.cake + '"', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (rows.length) {
      res.status(200).send(rows[0]);
    }

  });
}

function setOrder (req, res, next) {
    connection.query(
      'INSERT INTO Orders ( ' +
      'Customer, ' +
      'idCake, ' +
      'Weight, ' +
      'Price, ' +
      'Comment, ' +
      'Phone,' +
      'Data' +
      ') VALUES ("'
      + req.param('names', null) + '", "'
      + req.param('cake', null) +'", "'
      + req.param('weight', null) +'", "'
      + req.param('price', null)+'", "'
      + req.param('wish', null) +'", "'
      + req.param('phone', null) +'", "'
      + req.param('timeDelivery', null)
      +'")' , function (err, rows, fields) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);

        res.status(200).send('ok');

      });
}

module.exports = {
  getWeight: getWeight,
  setOrder: setOrder
}
