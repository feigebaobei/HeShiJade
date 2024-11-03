var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser')
let cors = require('./cors')
let staticData = require('../data/table')
let clog = console.log

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.post(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.put(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send(200)
})

router.route('/table')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  let data = staticData.arr.slice((req.query.page - 1) * req.query.pageSize, req.query.page * req.query.pageSize)
  res.status(200).json({
    code: 0,
    message: '',
    data,
  })
})
.post(cors.corsWithOptions, (req, res) => {
  let data = staticData.arr.slice((req.query.page - 1) * req.query.pageSize, req.query.page * req.query.pageSize)
  res.status(200).json({
    code: 0,
    message: '',
    data,
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send(200)
})


router.route('/form')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.post(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: '',
    data: [
      {
        id: 1,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 2,
        name: 'name',
        grade: '二年级',
      },
      {
        id: 3,
        name: 'name',
        grade: '三年级',
      },
      {
        id: 4,
        name: 'name',
        grade: '二年级',
      },
      {
        id: 5,
        name: 'name',
        grade: '三年级',
      },
      {
        id: 6,
        name: 'name',
        grade: '二年级',
      },
      {
        id: 7,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 8,
        name: 'name',
        grade: '三年级',
      },
      {
        id: 9,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 10,
        name: 'name',
        grade: '二年级',
      },
      {
        id: 11,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 12,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 13,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 14,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 15,
        name: 'name',
        grade: '三年级',
      },
      {
        id: 16,
        name: 'name',
        grade: '三年级',
      },
      {
        id: 17,
        name: 'name',
        grade: '三年级',
      },
      {
        id: 18,
        name: 'name',
        grade: '一年级',
      },
      {
        id: 19,
        name: 'name',
        grade: '一年级',
      },
        ],
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
router.route('/form/submit')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.post(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: '',
    data: {},
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send(200)
})
module.exports = router;
