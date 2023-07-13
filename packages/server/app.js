var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// let { MongoClient } = require('mongodb')
let session = require('express-session')
let MongoDBStore = require('connect-mongodb-session')(session)
let clog = console.log

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

let store = new MongoDBStore({
  uri: 'mongodb+srv://feigebaobei:1qaz2wsx@feigebaobei.ojo8z3u.mongodb.net/?retryWrites=true&w=majority',
  databaseName: 'session',
  collection: 'session',
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  name: 'hi4',
  secret: '1234567890', // 必填
  saveUninitialized: true, // 有它才能设置成功cookie
  resave: true,
  // cookie: {
  //   maxAge: 1000 * 60 * 60 * 24 * 30,
  //   // path: '',
  //   secure: false,
  //   sameSite: true,
  //   httpOnly: true,
  // },
  store,
}))
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
