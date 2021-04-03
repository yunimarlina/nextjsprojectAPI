// import { MongoClient } from 'mongodb'

// if(!MONGODB_URI){
//     throw new Error(
//         "Please define MongoDB_URI inside .env.local"
//     )
// }
// if(!MONGODB_DB){
//     throw new Error(
//         "Please define MongoDB_DB inside .env.local"
//     )
// }

// let chached = global.mongo 
// if(!chached) chached = global.mongo = {}

// export async function connectToDatabase(){
//     if(chached.conn) return chached.conn
//     if(!chached.promise) {
//         const conn  = {}
//         const opts = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }  
    
//         chached.promise = MongoClient.connect(MONGODB_URI,opts)
//             .then((client)=>{
//                 conn.client = client
//                 return client.db(MONGODB_DB)
//             })
//             .then((db)=>{
//                 conn.db =db
//                 chached.conn = conn
//             })
//     }
//     await chached.promise
//     return chached.conn

// }

const {MongoClient} = require("mongodb")

const url = "mongodb+srv://yunimarlina:1315satu@cluster0.1dvrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client =new MongoClient(url,{useUnifiedTopology: true})
const database = 'nextjs'
client.connect()

const db = client.db(database)

module.exports = db