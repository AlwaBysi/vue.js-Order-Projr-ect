var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');


var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/Form/Login/Login');
var store = require('./routes/Form/Store/Store');
var Orders = require('./routes/Form/Orders/Orders');
var OrdersList = require('./routes/Form/OrderList/OrdersList');
var Cakes = require('./routes/Form/Cakes/Cakes');
var Chart = require('./routes/Form/Chart/Chart');
var ingr = require('./routes/Form/Ingr/Ingr');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(moment);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/admin', login);
app.use('/store', store);
app.use('/Orders', Orders);
app.use('/OrdersList', OrdersList);
app.use('/Cakes', Cakes);
app.use('/Chart', Chart);
app.use('/ingr', ingr);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
