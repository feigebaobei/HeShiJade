var express = require('express');
var cors = require('./cors')
var router = express.Router();
let bodyParser = require('body-parser');
let multer = require('multer');
let {fragmentDb} = require('../mongodb')
let { rules, instance } = require('../helper/index');
const { sizeObj, DB } = require('../helper/config');
const { errorCode } = require('../helper/errorCode');
let clog = console.log

router.use(bodyParser.json())

let upload = multer()


router.route('/')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  new Promise((s, j) => {
    if (req.query.key) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
    return fragmentDb.collection(DB.prod.pluginTable).findOne({'profile.key': req.query.key}).then((pluginObj) => {
      return pluginObj
    }).catch(() => {
      return Promise.reject(200010)
    })
  }).then((pluginObj) => {
    res.status(200).json({
      code: 0,
      message: '',
      data: pluginObj
    })
  }).catch(code => {
    res.status(200).json({
      code,
      message: errorCode[code],
      data: {}
    })
  })
})
.post(cors.corsWithOptions, upload.single('pluginFile'), (req, res) => {
  new Promise((s, j) => {
    if (req.file.size > (sizeObj['1kb'] * 2)) {
      j(100144)
    } else {
      s(true)
    }
  }).then(() => {
    let pluginStr = req.file.buffer.toString()
    let pluginObj = JSON.parse(pluginStr)
    clog(pluginObj)
    let t = {}
    Array.from(Object.entries(pluginObj)).forEach(([k, v]) => {
      if (!['profile', 'hooks'].includes(k)) {
        t[k] = v
      }
    })
    return fragmentDb.collection(DB.prod.pluginTable).insertOne({
      profile: pluginObj.profile,
      hooks: pluginObj.hooks,
      ...t,
    }).catch(() => {
      return Promise.reject(200000)
    })
  }).then(() => {
    res.status(200).json({
      code: 0,
      message: "ok",
      data: pluginObj,
    })
  }).catch((code) => {
    res.status(200).json({
      code,
      message: errorCode[code],
      data: {},
    })
  })
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

// router.route('/:key')
// .options(cors.corsWithOptions, (req, res) => {
//   res.sendStatus(200)
// })
// .get(cors.corsWithOptions, (req, res) => {
//   // req.params.key
//   // res.status(200).json({   // x
//   //   code: 0,
//   //   message: '',
//   //   data: {
//   //     profile: {
//   //       key: 'key',
//   //       authorEmail: 'authorEmail',
//   //       authorName: 'authorName',
//   //     },
//   //     hooks: {
//   //       rootInstancePost: "() => {return 'rootInstancePost'}",
//   //       pageInstancePost: () => {return 'pageInstancePost'},
//   //       componentInstancePost: () => {return 'componentInstancePost'},
//   //     },
//   //     fnx: () => {
//   //       clog('fnx')
//   //     }
//   //   }
//   // })

//   // res.end({   // x
//   //       profile: {
//   //         key: 'key',
//   //         authorEmail: 'authorEmail',
//   //         authorName: 'authorName',
//   //       },
//   //       hooks: {
//   //         rootInstancePost: "() => {return 'rootInstancePost'}",
//   //         pageInstancePost: () => {return 'pageInstancePost'},
//   //         componentInstancePost: () => {return 'componentInstancePost'},
//   //       },
//   //       fnx: () => {
//   //         clog('fnx')
//   //       }})


//   res.status(200).json({
//     code: 0,
//     message: 'ok',
//     data: {
//       profile: {
//         key: 'key',
//         authorEmail: 'authorEmail',
//         authorName: 'authorName',
//       },
//       hooks: {
//         rootInstancePost: "() => {return 'rootInstancePost'}",
//         pageInstancePost: "() => {return 'pageInstancePost'}",
//         componentInstancePost: "() => {return 'componentInstancePost'}",
//       },
//       fnx: "() => {clog('fnx')}"
//     }
// })

//   // res.write('str')   // ok

//   // res.write({k: 's'})   // x
//   // res.end()

//   // res.send('sss') // ok
//   // res.send([1, 2]) // ok
//   // res.send({k: 2,b: true, y: () => {}}) // x


// })
// .post(cors.corsWithOptions, (req, res) => {
//   res.status(200).json({
//     code: 0,
//     message: "ok",
//     data: {},
//   })
// })
// .put(cors.corsWithOptions, (req, res) => {
//   res.send('put')
// })
// .delete(cors.corsWithOptions, (req, res) => {
//   res.send('delete')
// })


module.exports = router;
