const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const Config = require('../utils/config')

const mongoose = require('mongoose');

blogRouter.get('/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1, likes: 1});
    
    console.log("blogs in blogs route ier", blogs)


    response.json(blogs);

  })
  
  blogRouter.post('/blogs', async (request, response) => {
    console.log("request body doc is", request.body)

    console.log("User is", request.user);

  
    const user = request.user


    if(!request.body.title || !request.body.url){
      console.log("I'm in the if statement")
       response.status(400).send()
    }
    if(!request.body.likes){
      console.log("No likes");
      request.body.likes = 0;
    }

    const body = request.body;
    console.log("body is", body)


    console.log("User is", user)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    console.log("Blog in controller before saved is", blog)

    console.log("about to save")
  
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)  
    await user.save();
    console.log("New blog is", blog);

    console.log("New blog is", result);


    const blogResult = await Blog.findById(result._id).populate('user', {username: 1, name: 1, id: 1});

    console.log("New blog result is", blogResult);

    
    



    response.status(201).json(result);

  })

  blogRouter.delete('/blogs/:id', async (request, response) => {

    const token = request.token;
    const decodedToken = jwt.verify(token, Config.SECRET)  
    if (!token || !decodedToken.id) {    
      return response.status(401).json({ error: 'token missing or invalid' })  
    }  


    const user = request.user

    console.log("I am in the delete controller")
    const id = request.params.id;
    const result = await Blog.findById(id)

    console.log("blog to string is", result.user.toString() )
    console.log("decoded to string is", decodedToken.id.toString() )


    if ( result.user.toString() === decodedToken.id.toString() ){
      const blogDelete = await Blog.findByIdAndRemove(id);
      console.log("Result of delete is", blogDelete)
      response.status(200).send();

    } else{
      return response.status(401).json({ error: 'You are not the blog author and cannot delete' })  

    }

  })

  blogRouter.put('/blogs/:id', async (request, response) => {
    const body = request.body
    console.log("New body is", body);
  
    console.log("I am in the update controller1")


    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
  }


  console.log("New blog is", blog);

  const response2 = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });

    console.log("I am in the update controller")
    console.log("Result of update is", response2)
    response.status(200).json(response2);
  })


  module.exports = blogRouter;