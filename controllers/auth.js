require('dotenv').config()
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')


// hashing function
const hash = (password) => {
  const levelOne = crypto.createHmac('sha256', process.env.SECRET)
                  .update(password)
                  .digest('hex')
                  .split('')
                  .reverse()
                  .join('j')
  return crypto.createHmac('sha256', process.env.SECRET)
                  .update(levelOne)
                  .digest('hex')
                  .split('')
                  .reverse()
                  .join('')
}

module.exports.hash = hash
// register

const registerService = async (req, res) => {
  console.log(req.body)
  const hashedPassword = hash(req.body.password)
  console.log('hashedPassword:', hashedPassword )
  req.body.password = bcrypt.hashSync(hashedPassword, bcrypt.genSaltSync(10))
  console.log(req.body)

  try{
    const createdUser = await User.create(req.body)
    const token = jwt.sign({
      username: createdUser.username
    }, SECRET)
    res.status(200).json({ user: createdUser, token })
  }catch(err){
    console.error(err)
    res.status(400).json({ msg: err.message })
  }
}

module.exports.register = registerService;

// verification

// login



// header authenticate

// json body authenticate
