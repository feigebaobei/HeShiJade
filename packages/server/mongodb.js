let { MongoClient } = require('mongodb')
let clog = console.log

let uri = 'mongodb+srv://feigebaobei:1qaz2wsx@feigebaobei.ojo8z3u.mongodb.net/?retryWrites=true&w=majority'
let client = new MongoClient(uri)
let lowcodeDb = client.db('lowcode')
let fragmentDb = client.db('fragment')
// let lowcodeDb = client.db('users')
// let lowcodeDb = client.db('lowcode')
// // 日后会删除以下三个数据库
// let appsDb = client.db('apps')
// let pagesDb = client.db('pages')
// let componentsDb = client.db('components')
// let usersCollection = database.collection('users')

module.exports = {
    lowcodeDb,
    fragmentDb,
}