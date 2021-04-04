
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { verify } from 'jsonwebtoken'
const db = require('../../../util/mongodb')
const ticket = db.collection('ticket')
const {ObjectId} = require('mongodb')



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

export default authenticated(async function getTicketDetail (req, res){
const {
    query: { id },
    method
} = req
switch (method) {
case 'GET':

    console.log(id)
    try {
        let tickets = await ticket.findOne({_id: ObjectId(id)})
        console.log(tickets)
        res.status(200).json({ success: true, data: tickets })
    } catch (error) {
        res.status(400).json({ success: false })
    }
break

case 'PUT':
    console.log(req.body)
    const payload = {
        status: req.body.status,
        message: req.body.message
    }
        try {
            const data = await ticket.findOneAndUpdate({ticket_number: +id}, { $set: payload})
            res.status(201).json({ success: true, message:"Status and Message Updated" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }

break

case 'PATCH':
    console.log(req.body)
    console.log(id)

        try {
            const data = await ticket.updateOne({ticket_number: +id}, { $set: req.body})
            res.status(201).json({ success: true, message:"Status Closed"  })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }

break

case 'DELETE':
        try {
            const data = await ticket.deleteOne({_id: ObjectId(id)})
            res.status(201).json({ success: true, message:"Deleted" })
        } catch (error) {
            console.log(error)
            res.status(400).json({ success: false })
        }

break
default:
    res.status(400).json({ success: false })
    break
}
})
