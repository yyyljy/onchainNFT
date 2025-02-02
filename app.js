const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const corsSetup = require('./middlewares/cors');

const app = express();

// Setup cross-origin resource sharing
app.use(corsSetup);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routers
app.use('/', require('./routes/auth'));
app.use('/accounts', require('./routes/accounts'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
