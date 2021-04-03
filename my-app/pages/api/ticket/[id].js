// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../../util/mongodb')
const ticket = db.collection('ticket')
const {ObjectId} = require('mongodb')
const {generateNumber} = require('../../../helpers/ticketNumber')
import { query } from 'express'
import { useRouter } from 'next/router'

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req
//   const router =useRouter()
//   console.log(id)
  switch (method) {
    case 'GET':

        console.log(id)
        try {
            let tickets = await ticket.findOne({_id: ObjectId(id)})
            console.log(tickets)
            res.status(200).json({ success: true, data: tickets })
        } catch (error) {
            res.status(400).json({ success: false });
        }
    break;

    case 'PUT':
        console.log(req.body)
        const payload = {
            status: req.body.status,
            message: req.body.message
        }
            try {
                const note = await ticket.findOneAndUpdate({ticket_number: +id}, { $set: payload})
                res.status(201).json({ success: true, data: note })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }

    break;

    case 'PATCH':
        console.log(req.body)
        console.log(id)

            try {
                const note = await ticket.updateOne({ticket_number: +id}, { $set: req.body})
                res.status(201).json({ success: true, data: note })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }

    break;

    case 'DELETE':
            try {
                const note = await ticket.deleteOne({_id: ObjectId(id)})
                res.status(201).json({ success: true, message:"Deleted" })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false })
            }

    break;
    default:
        res.status(400).json({ success: false });
        break;
  }
}
