var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
let {lowcodeDb} = require('../mongodb')
let { rules, instance } = require('../helper/index')
const { errorCode } = require('../helper/errorCode');
let clog = console.log

router.use(bodyParser.json())

router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: '',
    data: {}
  })
})
.post(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: "ok",
    data: {},
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

router.route('/:key')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  // req.params.key
  // res.status(200).json({   // x
  //   code: 0,
  //   message: '',
  //   data: {
  //     profile: {
  //       key: 'key',
  //       authorEmail: 'authorEmail',
  //       authorName: 'authorName',
  //     },
  //     hooks: {
  //       rootInstancePost: "() => {return 'rootInstancePost'}",
  //       pageInstancePost: () => {return 'pageInstancePost'},
  //       componentInstancePost: () => {return 'componentInstancePost'},
  //     },
  //     fnx: () => {
  //       clog('fnx')
  //     }
  //   }
  // })

  // res.end({   // x
  //       profile: {
  //         key: 'key',
  //         authorEmail: 'authorEmail',
  //         authorName: 'authorName',
  //       },
  //       hooks: {
  //         rootInstancePost: "() => {return 'rootInstancePost'}",
  //         pageInstancePost: () => {return 'pageInstancePost'},
  //         componentInstancePost: () => {return 'componentInstancePost'},
  //       },
  //       fnx: () => {
  //         clog('fnx')
  //       }})


  res.status(200).json({
    code: 0,
    message: 'ok',
    data: {
      profile: {
        key: 'key',
        authorEmail: 'authorEmail',
        authorName: 'authorName',
      },
      hooks: {
        rootInstancePost: "() => {return 'rootInstancePost'}",
        pageInstancePost: "() => {return 'pageInstancePost'}",
        componentInstancePost: "() => {return 'componentInstancePost'}",
      },
      fnx: "() => {clog('fnx')}"
    }
})

  // res.write('str')   // ok

  // res.write({k: 's'})   // x
  // res.end()

  // res.send('sss') // ok
  // res.send([1, 2]) // ok
  // res.send({k: 2,b: true, y: () => {}}) // x


})
.post(cors.corsWithOptions, (req, res) => {
  res.status(200).json({
    code: 0,
    message: "ok",
    data: {},
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})


module.exports = router;
