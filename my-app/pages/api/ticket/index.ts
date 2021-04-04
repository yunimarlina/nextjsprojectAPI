// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
const db = require('../../../util/mongodb')
const ticket = db.collection('ticket')
const {ObjectId} = require('mongodb')
const generateNumber = require('../../../helpers/ticketNumber')

export const authenticated = (fn: NextApiHandler) => async (
req: NextApiRequest,
res: NextApiResponse
) => {
verify(req.headers.access_token!, "secret", async function(err, decoded) {
    if (!err && decoded) {
    return await fn(req, res)
    }

    res.status(401).json({ message: 'Sorry you are not authenticated' })
})
}

export default authenticated(async function getTicket (req,res) {

const {
    query: { limit },
    method
} = req

switch (method) {
    case 'GET':
console.log(limit)
    
        try {
            let tickets = await ticket.find({},{"subject":2,_id:0}).limit(+limit).toArray()
            if(tickets.length === 0){
                const payload = {
                    subject: "This is New Ticket",
                    ticket_number: generateNumber(),
                    message: "Hi,please proccess this",
                    status: "Open",
                    priority: "High"
                }
                const tickets = await ticket.insertOne(payload)
                res.status(201).json({ success: true, data: tickets.ops })

            }
            res.status(200).json({ success: true, data: tickets })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }
    break
    case 'POST':
        const ticket_number = generateNumber()
        const payload = {
            subject: req.body.subject,
            ticket_number: ticket_number,
            message: req.body.message,
            status: req.body.status,
            priority: req.body.priority
        }
        try {
            if((req.body.status === "Open" || req.body.status === "Answered" || req.body.status === "Closed") &&
                (req.body.priority === "High" || req.body.priority === "Medium" || req.body.priority === "Low")){
                    try {
                        const tickets = await ticket.insertOne(payload)
                        res.status(201).json({ success: true, data: tickets.ops })
                    } catch (error) {
                        console.log(error)
                        res.status(400).json({ success: false })
                    }
                    
            }
            else{
                    res.status(400).json({ success: false, message:"Invalid Input Status or Priority" })
            }

        }
        catch(error){
            console.log(error)
            res.status(400).json({ success: false,messsage: error.messsage})

        }
    
    break
    default:
        res.status(400).json({ success: false })
        break
}
})
