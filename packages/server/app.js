var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let { MongoClient } = require('mongodb')
let clog = console.log

// let uri = 'mongosh "mongodb+srv://feigebaobei.ojo8z3u.mongodb.net/" --apiVersion 1 --username feigebaobei'
let uri = 'mongodb+srv://feigebaobei:1qaz2wsx@feigebaobei.ojo8z3u.mongodb.net/?retryWrites=true&w=majority'
let client = new MongoClient(uri)
try {
  let database = client.db('sample_mflix')
  let movies = database.collection('movies')
  let query = { title: 'Back to the Future' };
  let movie
  movies.findOne(query).then((...res) => {
    movie = res
    clog('res', res)
  }).catch(error => {
    clog('error', error)
  })
} finally {
  clog('连接成功')
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
