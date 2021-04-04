const supertest = require('supertest');
const mongoose = require('mongoose');
const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog')
const app = require('../app');
const api = supertest(app);

test('HTTP get test', async () => {
       const response =  await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
          
          expect(response.body).toHaveLength(4);
})

test('HTTP get id test', async () => {
    const response =  await api
       .get('/api/blogs')
       .expect(200)
       .expect('Content-Type', /application\/json/)
       
       let blog = () => response.body[0];
    
       
       expect(() => blog().toBeDefined())
})

test('HTTP get verify post', async () => {

    const response =  await api
    .get('/api/blogs')

    let numb = response.body.length;

    let blog1 = new Blog({
        title: "Hello",
        author: "jeff6",
        url: "fake.com",
        likes: 3
    })

    
    const response2 =  await api
       .post('/api/blogs')
       .send(blog1)
       .expect(201)
       .expect('Content-Type', /application\/json/);

       const response3 =  await api
       .get('/api/blogs')
       
       expect(response3.body).toHaveLength(numb+1);
    })


test('HTTP get verify likes', async () => {

        const response =  await api
        .get('/api/blogs')
    
        let numb = response.body.length;
    
        let blog1 = new Blog({
            title: "LikesTest",
            author: "Jefflikes",
            url: "fake.com",
        })
    
        
        const response2 =  await api
           .post('/api/blogs')
           .send(blog1)
           .expect(201)
           .expect('Content-Type', /application\/json/);

           console.log("Response 2 is", response2);
    
           const response3 =  await api
           .get('/api/blogs')
           
           expect(response3.body).toHaveLength(numb+1);
        })

        test('HTTP missing title', async () => {
        
        
            let blog1 = new Blog({
                author: "Jeffnotitle",
                url: "fake.com",
                likes: 3
            })
        
            
            const response2 =  await api
               .post('/api/blogs')
               .send(blog1)
               .expect(400)

            })

            test('HTTP missing url', async () => {
        
        
                let blog1 = new Blog({
                    author: "jeffnourl",
                    title: "LikesTest",
                    likes: 3
                })
            
                
                const response2 =  await api
                   .post('/api/blogs')
                   .send(blog1)
                   .expect(400)
    
                })
        

test('HTTP delete id test', async () => {

    let blog1 = new Blog({
        title: "toDelete",
        author: "toDelete",
        url: "fake.com",
        likes: 3
    })

    
    const response2 =  await api
       .post('/api/blogs')
       .send(blog1)
       .expect(201)
       .expect('Content-Type', /application\/json/);

       const id = response2.body.id;
       console.log('/api/blogs?id=' + id);

       const response3 =  await api
       .delete('/api/blogs/' + id)
       .send(blog1)
       .expect(200);       
})


test('HTTP update blog test', async () => {

    let blog1 = new Blog({
        title: "toUpdate",
        author: "toUpdate",
        url: "fake.com",
        likes: 3
    })

    
    const response2 =  await api
       .post('/api/blogs')
       .send(blog1)
       .expect(201)
       .expect('Content-Type', /application\/json/);

       const id = response2.body.id;
       console.log('/api/blogs?id=' + id);

       let blog2 = new Blog({
        title: "I'm updated",
        author: "I'm also updated",
        url: "fakeupdated.com",
        likes: 5
    })

       const response3 =  await api
       .put('/api/blogs/' + id)
       .send(blog2)
       .expect(200);   
       
       expect(response3.body.title).toEqual("I'm updated")
})



afterAll(async () => {
   await mongoose.connection.close()
  })