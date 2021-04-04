const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const loginRouter = require('express').Router();
const Blog = require('../models/blog');
const Config = require('../utils/config');

loginRouter.post('/', async (request, response) => {
    const body = request.body
  
    const user = await User.findOne({ username: body.username })
    console.log(user);
    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.password)
  
    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: 'invalid username or password'
      })
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }
  
    const token = jwt.sign(userForToken, Config.SECRET)
  
    response
      .status(200)
      .send({ token, username: user.username, name: user.name })
  })
  
  module.exports = loginRouter