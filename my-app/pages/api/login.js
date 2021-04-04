// res.status(200).json.js API route support: https://res.status(200).jsonjs.org/docs/api-routes/introduction

const db = require('../../util/mongodb')
const user = db.collection('user')
const { generatePassword, verifyPassword } = require('../../helpers/bcrypt')
const { generateToken} = require('../../helpers/jwt')

export default async (req, res) => {

  const {
      query: { limit },
      method
  } = req;

  switch (method) {
      case 'POST':
        const id = "6069955db1402322bcb72278"
        const email = "user@mail.com"
        const password = "12345"
        console.log(email,password)
        try {
          let data = await user.findOne({email: email})
          console.log(data)
          if(!data){
            res.status(200).json({status: 401, message: `Account Not Found` })
          }
          else if (verifyPassword(password, data.password )){
            const access_token = generateToken({id: data.id,email: data.email})
            res.status(200).json({ id:data.id, name: data.name, email: data.email, access_token })
          }
          else if (!verifyPassword(password, data.password)){
            res.status(200).json({ status: 404, message: 'Invalid Email/Password'})
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
