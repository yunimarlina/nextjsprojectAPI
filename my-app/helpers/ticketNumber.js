const db = require('../util/mongodb')
const ticket = db.collection('ticket')
const {ObjectId} = require('mongodb')


function generateNumber(object) {
  let ticketNumber = Math.floor(Math.random() * 10000000)

  ticket.findOne({ticket_number: ticketNumber})
    .then(data=>{
      console.log(data)
      if(data){
        ticketNumber = Math.floor(Math.random() * 10000000)
      }
    })
    .catch(error=>{
      console.log(error)
    })

    return ticketNumber
  
}
module.exports = {generateNumber}