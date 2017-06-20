var connection = require('../../../connect');
var moment = require('moment');

function allOrders (req, res, next) {
  console.log(req.query.startTime)
  console.log(req.query.endTime)
    connection.query('SELECT * FROM Orders WHERE DATA >= "'+ req.query.startTime +'" AND DATA <= "'+ req.query.endTime +'"', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    rows.forEach(function (item) {
      item.Data = moment(item.Data).add(1, 'day')
    })

    res.status(200).send(rows);
  });
}

function ConfirOrder (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  console.log('удаляем')
  if (req.param('deleteOrder', null)) {

    connection.query('DELETE FROM Orders WHERE idOrders = "'+ req.param('id', null) +'"', function (err, rows, fields) {
      res.status(200).send(req.param('id', null));
    });
  } else {
    const idCake = req.param('idCake', null)
    console.log('idCake' + idCake)
    connection.query('UPDATE Orders SET Confirmed = 1 WHERE idOrders = "'+ req.param('id', null) +'"', function (err, rows, fields) {
      // списание ингридиентов
      connection.query('SELECT * FROM Formula WHERE idCake = "'+ idCake +'"', function (err, rows, fields) {
        rows.forEach(function (item) {
          connection.query('UPDATE Store SET quantity = quantity - "'+ (Number(item.quantity) * Number(req.param('weight', null))) +'" WHERE idIngr = "'+ item.idIngr +'"')
          connection.query('INSERT INTO feature_ingr (idIngr, Date, Quantity) VALUES ("'+ item.idIngr +'", "'+ req.param('date', null) +'", "'+ (Number(item.quantity) * Number(req.param('weight', null))) +'")')
        })
      })
      // списание ингридиентов
      res.status(200).send(req.param('id', null));
    });
  }

}

module.exports = {
  allOrders: allOrders,
  ConfirOrder: ConfirOrder
}
