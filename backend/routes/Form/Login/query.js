var connection = require('../../../connect');

function allUsers (req, res, next) {
  connection.query('SELECT password FROM user WHERE username = "'+ req.query.login +'"', function (err, rows, fields) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (rows.length && rows[0].password === req.query.password) {
      res.status(200).send({ msg: 'success login!', tokenId: Math.random().toFixed(5).split('.')[1]});

    } else {
      res.status(400).send({ error: 'login failed!' });
    }

  });
}

module.exports = {
  allUsers: allUsers
}