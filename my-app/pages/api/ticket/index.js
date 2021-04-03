// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const db = require('../../../util/mongodb')
const ticket = db.collection('ticket')
const {ObjectId} = require('mongodb')
const {generateNumber} = require('../../../helpers/ticketNumber')

export default async (req, res) => {
  
    const {
        query: { limit },
        method
    } = req;

    switch (method) {
        case 'GET':
    console.log(limit)
        
            try {
                let tickets = await ticket.find().toArray();
                if(tickets.length === 0){
                    const payload = {
                        subject: "This is New Ticket",
                        ticket_number: generateNumber(),
                        message: "Hi,please proccess this",
                        status: "Open",
                        priority: "High"
                    }
                    const ticket = await ticket.insertOne(payload)
                    res.status(201).json({ success: true, data: ticket.ops })

                }
                res.status(200).json({ success: true, data: tickets })
            } catch (error) {
                res.status(400).json({ success: false });
            }
        break;
        case 'POST':
            const ticket_number = generateNumber()

            const payload = {
                subject: req.body.subject,
                ticket_number: ticket_number,
                message: req.body.message,
                status: req.body.status,
                priority: req.body.priority
            
            }
            // console.log(payload)
            // if(req.body.status !== "Open" || req.body.status !== "Answered" || req.body.status !== "Closed"){
            //         res.status(400).json({ success: false, message:"Invalid Input Status" });
                    
            // }
            // else if( req.body.priority !== "High" || req.body.priority !== "Medium" || req.body.priority !== "Low"){
            //         res.status(400).json({ success: false, message:"Invalid Input Priority" });
                    
            // }
            
            // else{
            //     try {
            //         const ticket = await ticket.insertOne(payload)
            //         res.status(201).json({ success: true, data: ticket })
            //     } catch (error) {
            //         // console.log(error)
            //         res.status(400).json({ success: false })
            //     }
            // }
                if((req.body.status === "Open" || req.body.status === "Answered" || req.body.status === "Closed") &&
                    (req.body.priority === "High" || req.body.priority === "Medium" || req.body.priority === "Low")){
                        try {
                            const ticket = await ticket.insertOne(payload)
                            res.status(201).json({ success: true, data: ticket.ops })
                        } catch (error) {
                            console.log(error)
                            res.status(400).json({ success: false })
                        }
                        
                }
                
                else{
                    // if(req.body.status !== "Open" || req.body.status !== "Answered" || req.body.status !== "Closed"){
                        res.status(400).json({ success: false, message:"Invalid Input Status" });
                        
                    // }
                    // else if( req.body.priority !== "High" || req.body.priority !== "Medium" || req.body.priority !== "Low"){
                    //         res.status(400).json({ success: false, message:"Invalid Input Priority" });
                            
                    // }

                }

        
        break;
        // case 'PATCH':

        //     if((req.body.status !== "Open" || req.body.status !== "Answered" || req.body.status !== "Closed") ||
        //         (req.body.priority !== "High" || req.body.priority !== "Medium" || req.body.priority !== "Low")){
        //         res.status(400).json({ success: false, message:"Invalid Input Status or Priority" });

        //     }
        //     else{
        //         try {
        //             const ticket = await ticket.findOneAndUpdate({_id: ObjectId(id)}, { $set: payload })
        //             res.status(201).json({ success: true, data: ticket })
        //         } catch (error) {
        //             console.log(error)
        //             res.status(400).json({ success: false })
        //         }
        //     }
        // break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}
