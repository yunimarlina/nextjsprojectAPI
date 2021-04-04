// res.status(200).json.js API route support: https://res.status(200).jsonjs.org/docs/api-routes/introduction

const db = require('../../util/mongodb')
const user = db.collection('user')
const {ObjectId} = require('mongodb')
const { generatePassword, verifyPassword } = require('../../helpers/bcrypt')
const { generateToken} = require('../../helpers/jwt')

export default async (req, res) => {

  const {
      query: { limit },
      method
  } = req;

  switch (method) {
      case 'POST':
        try {
          let userData = await user.find().toArray();
          if(userData.length === 0){
              let payload = {
                email:"user@mail.com",
                password:generatePassword("12345")
              }
              let userData = await user.insertOne(payload)
              res.status(201).json({ success: true, data: userData.ops })
          }
        }
        catch (error) {
          console.log(error)
          res.status(400).json({ success: false });
        }

      

      
      break;
      default:
          res.status(400).json({ success: false });
          break;
  }
}
