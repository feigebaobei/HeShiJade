var express = require('express');
var router = express.Router();
let bodyParser = require('body-parser')
let cors = require('./cors')
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
  // res.send(200)
  res.status(200).json({
    code: 0,
    message: '',
    data: [
      {
        id: 1,
        name: 'name',
        a: 'a',
        d: 'd',
      },
      {
        id: 2,
        name: 'name2',
        a: 'a2',
        d: 'd2',
      },
      {
        id: 1,
        name: 'name3',
        a: 'a3',
        d: 'd3',
      },
      {
        id: 1,
        name: 'name4',
        a: 'a4',
        d: 'd4',
      },
    ],
  })
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

module.exports = router;
