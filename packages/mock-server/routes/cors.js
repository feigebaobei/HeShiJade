var cors = require('cors')

var whiteList = ['http://localhost:4200', 'http://127.0.0.1:4200',
'http://localhost:4210', 'http://127.0.0.1:4210',
'http://heshijade.com:4200', 'http://heshijade.com:4210',
'http://heshijade.com:80', 'http://heshijade.com',
]
var corsOptionDelegate = (req, cb) => {
  var corsOptions
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = {
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      allowdHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'X-Content-Range']
    }
  } else {
    corsOptions = {origin: false}
  }
  cb(null, corsOptions)
}

module.exports = {
  cors: cors(),
  corsWithOptions: cors(corsOptionDelegate)
}