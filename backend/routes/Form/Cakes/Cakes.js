var express = require('express');
var router = express.Router();
var db = require('./query')

router.get('/', function(req, res, next) {
  db.allCakes(req, res, next)
});

module.exports = router;