const supertest = require('supertest');
const mongoose = require('mongoose');
const Blog = require('../models/blog')
const User = require('../models/user')

const app = require('../app');
const api = supertest(app);


test('User post test', async() => {

    const user = {
        username: "jeff",
        name: "jeff",
        password: "password",
        blogs: []
    }

    const response =  await api
       .post('/api/user')
       .send(user)
       .expect(200)
       
})


test('User get test', async () => {
    const response =  await api
       .get('/api/users')
       .expect(200)
       .expect('Content-Type', /application\/json/)
       })

test('User duplicate test', async () => {

const user = {
    username: "jeff",
    name: "jeff",
    password: "password",
    blogs: []
}

const response =  await api
    .post('/api/user')
    .send(user)

const response2 =  await api
    .post('/api/user')
    .send(user)
    .expect(400)
    })


test('blog add user', async () => {

const response =  await api
.get('/api/blogs')

let numb = response.body.length;

let blog1 = {
    title: "Hello",
    author: "jeff6",
    url: "fake.com",
    likes: 3
}


const response2 =  await api
    .post('/api/blogs')
    .send(blog1)
    .expect(201)
    .expect('Content-Type', /application\/json/);

    const response3 =  await api
    .get('/api/blogs')

   // console.log("Result is", response2)
    
    expect(response3.body).toHaveLength(numb+1);
})


afterAll(async () => {
    await mongoose.connection.close()
  })