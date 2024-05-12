var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')
// let morganBody = require('morgan-body')
// let MongoDBStore = require('connect-mongodb-session')(session)
let clog = console.log

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appsRouter = require('./routes/apps');
var pagesRouter = require('./routes/pages');
var componentsRouter = require('./routes/components');

var app = express();

// let store = new MongoDBStore({
//   uri: 'mongodb+srv://feigebaobei:1qaz2wsx@feigebaobei.ojo8z3u.mongodb.net/?retryWrites=true&w=majority',
//   databaseName: 'session',
//   collection: 'session',
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// morganBody(app, {
//   noColors: true,
//   logRequestId:  true,
//   stream: fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), {flags: 'a'})
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  name: "user",
  secret: '1234',
  saveUninitialized: false,
  // saveUninitialized: true, // 为什么为true时可以setcookie成功
  // 是否保存未初始化（未存储的任务会话数据）的会话到存储介质中。
  resave: true, // 每次访问之后，过期时间重新设置过期时间
  cookie: {
    // sameSite: 'none',
    // secure: true,
    // domain: '127.0.0.1',
    // domain: 'http://127.0.0.1',
    // maxAge: 1000 * 60 * 60 * 24 * 30,
    domain: '.localhost/'
  }
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/apps', appsRouter)
app.use('/pages', pagesRouter)
app.use('/components', componentsRouter)

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

process.on('uncaughtException', function (err) {
  console.log(err);
}); 