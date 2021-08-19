require('dotenv').config()
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js')
const SECRET = process.env.SECRET

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

module.exports.register = registerService

// login

const loginService = async (req, res) => {
  // As a user i arrive at a form on the login page and
  // I enter my username and password
  /*
   req.body {
      username: String, <==== Unique 'nando'
      password: String  'mysupercoolpassword'
    }
    Find the user by the username and once we find the user we need
    to compare the password of the user we found with the hashed and salted
    version

    Notify the frontend everything is good, we found the user and verified the password by sending a token to the front end
  */
  console.log(req.body)
  try {
    const foundUser = await User.findOne({ username: req.body.username })
    // user { _id: xhioshxo, username: nando, password: xbosuqbgcuxbiosadvcuiv }
    req.body.password = hash(req.body.password)
    // req.body.password = bcrypt.hashSync(hashedPassword, bcrypt.genSaltSync(10))
    if(bcrypt.compareSync(req.body.password, foundUser.password)){
      const token = jwt.sign({
        username: foundUser.username
      }, SECRET)
      res.status(200).json({ user: foundUser, token })
    }else {
      throw new Error('stay in yo lane that aint your password')
    }
  }catch(err){
    console.error(err)
    res.status(400).json({ msg: err.message })
  }
}

module.exports.login = loginService

// verification



// header authenticate

// json body authenticate
