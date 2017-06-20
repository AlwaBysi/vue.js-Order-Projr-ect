var express = require('express');
var router = express.Router();
var db = require('./query')

router.get('/', function(req, res, next) {
  db.allOrders(req, res, next)
});

router.post('/', function(req, res, next) {
  db.ConfirOrder(req, res, next)
});

router.delete('/', function(req, res, next) {
  db.deleteOrder(req, res, next)
});

module.exports = router;