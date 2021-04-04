const User = require('../models/user');
const jwt = require('jsonwebtoken');
const Config = require('../utils/config');


const tokenExtractor = function (request, response, next){

const authorization = request.get('authorization')  
if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    console.log("authorization is", authorization.substring(7))
        request.token = authorization.substring(7)  
    } else{
        request.token = null
    }  
      next()
      }


const userExtractor = async function (request, response, next){

    const token = request.token;
    const decodedToken = jwt.verify(token, Config.SECRET)  
    if (!token || !decodedToken.id) {    
      request.user = null;  
    } else{
        const user = await User.findById(decodedToken.id)
        request.user = user;
    }

    next();

}



  module.exports = {tokenExtractor, userExtractor };