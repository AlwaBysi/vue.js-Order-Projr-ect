var connection = require('../../../connect');

function allCakes (req, res, next) {
  connection.query('SELECT * FROM Cakes', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (rows.length) {
      res.status(200).send(rows);
    }

  });
}

module.exports = {
  allCakes: allCakes
}
