let { MongoClient } = require('mongodb')
let clog = console.log

let uri = 'mongodb+srv://feigebaobei:1qaz2wsx@feigebaobei.ojo8z3u.mongodb.net/?retryWrites=true&w=majority'
let client = new MongoClient(uri)
let usersDb = client.db('users')
let appsDb = client.db('apps')
let pagesDb = client.db('pages')
let componentsDb = client.db('components')
// let usersCollection = database.collection('users')

module.exports = {
    usersDb,
    appsDb,
    pagesDb,
    componentsDb,
}