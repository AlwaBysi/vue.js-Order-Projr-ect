var express = require('express');
var router = express.Router();
var db = require('./query')

router.get('/', function(req, res, next) {
  db.getWeight(req, res, next)
});

router.post('/', function(req, res, next) {
  db.setOrder(req, res, next)
});

module.exports = router;