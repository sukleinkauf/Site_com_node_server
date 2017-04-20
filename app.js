var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var catalogo = require('./routes/catalogo');
var saibamais = require('./routes/sobre');
var produtos = require('./routes/db');
var produtoindividual = require('./routes/produto');
var dbencomendas = require('./routes/db2');
var encomendas = require('./routes/encomendas');
var favoritos = require('./routes/favoritos');
var fimcompra = require('./routes/fimcompra');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/catalogo', catalogo);
app.use('/db/produtos', produtos);
app.use('/db/encomendas', dbencomendas);
app.use('/encomendas', encomendas);
app.use('/saibamais', saibamais);
app.use('/produto', produtoindividual);
app.use('/favoritos', favoritos);
app.use('/fimdacompra', fimcompra);

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
