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
  // 校验参数
  // 检查是否重复
  // 存
  new Promise((s, j) => {
    if (req.file.size > (sizeObj['1kb'] * 2)) {
      j(100144)
    } else {
      s(true)
    }
  })
  .then(() => {
    try {
      let pluginStr = req.file.buffer.toString()
      let pluginObj = JSON.parse(pluginStr)
      return pluginObj
    } catch (error) {
      return Promise.reject(100144)
    }
  }).then((pluginObj) => {
    return fragmentDb.collection(DB.prod.pluginTable).findOne({'profile.key': pluginObj.profile.key}).then((_pluginObj) => {
      if (_pluginObj) {
        return Promise.reject(100120)
      } else {
        return pluginObj
      }
    })
  }).then((pluginObj) => {
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
      data: {},
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

router.route('/key')
.options(cors.corsWithOptions, (req, res) => {
  res.sendStatus(200)
})
.get(cors.corsWithOptions, (req, res) => {
  // 检查参数 key/pageSize/pageNumber
  // 取
  new Promise((s, j) => {
    if (rules.required(req.query.key)) {
      s(true)
    } else {
      j(100100)
    }
  }).then(() => {
  let [key, pageSize, pageNumber] = [req.query.key, req.query.pageSize || 10, req.query.pageNumber || 0]
    return fragmentDb.collection(DB.prod.pluginTable).find({
      key: req.query.key,
    }, {skip: pageSize * pageNumber}).limit(pageSize).catch(() => {
      return Promise.reject(200010)
    })
  }).catch((code) => {
    res.status(200).json({
      code,
      message: errorCode[code],
      data: {},
    })
  })
})
.post(cors.corsWithOptions, (req, res) => {
  res.send('post')
})
.put(cors.corsWithOptions, (req, res) => {
  res.send('put')
})
.delete(cors.corsWithOptions, (req, res) => {
  res.send('delete')
})

module.exports = router;
