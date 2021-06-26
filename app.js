var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerJsDoc = require('swagger-jsdoc');
var swaggerUI = require('swagger-ui-express');
var expressLayouts = require('express-ejs-layouts')
require('dotenv').config();
require('./services/db')(process.env.MONGO_URI)

// Swagger Documentation Specifications and decleration
var options = require('./services/swagger')
var specs = swaggerJsDoc(options);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var uploadRouter = require('./routes/upload');

var app = express();

// view engine setup
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Listening to route /api-docs
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/upload', uploadRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err.message);
  res.send(err.message);
});

module.exports = app;
