const userRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const middleWare = require('../middleware/middleware')



userRouter.post('/user', async(request, response) => {
    console.log("in users controller");
    const body = request.body;
    console.log("Body is", body);

    if(!body.password || !body.username){
        response.status(400).send("Must have user and password")
    }

    if(body.username.length < 3 || body.password.length < 3){
        response.status(400).send("Username and password must be at least 3 characters long")
    }

    const duplicate = await User.findOne({username: body.username});
    console.log(duplicate);

    if(duplicate){
        console.log("Found a duplicate");
        response.status(400).send("Please choose a different username")
    }

    const saltRounds = 10
   const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        password: passwordHash,
        blogs: []

    })

    
    const saved = await user.save();

    response.status(200).json(saved);

  })

  userRouter.get('/users', middleWare.tokenExtractor, middleWare.userExtractor, async (request, response) => {
      console.log("in User route handler, user is", request.user)
    const users = await User.findById(request.user._id).populate('blogs', {title: 1, author: 1, id: 1, url: 1, likes: 1, user: 1});
    console.log("in User route handler after call is user is", users)



    response.json(users.blogs.map(u => u.toJSON()));

  })

  module.exports = userRouter;