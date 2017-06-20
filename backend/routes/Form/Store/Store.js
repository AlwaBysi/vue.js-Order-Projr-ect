var express = require('express');
var router = express.Router();
var db = require('./query')

router.get('/', function(req, res, next) {
  db.allProducts(req, res, next)
});

router.post('/', function(req, res, next) {
  db.changeProducts(req, res, next)
});

module.exports = router;