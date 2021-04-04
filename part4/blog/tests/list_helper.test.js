const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog')
test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

test('Sums up all blog likes', () => {

    let blog1 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 3
    })

    let blog2 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 4
    })

    let myArray = [];
    myArray.push(blog1);
    myArray.push(blog2);    


    expect(listHelper.summation(myArray)).toBe(7);

})

test('Get blog with the most likes', () => {

    let blog1 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 7
    })

    let blog2 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 4
    })

    let myArray = [];
    myArray.push(blog1);
    myArray.push(blog2);    


    expect(listHelper.maximum(myArray)).toEqual(blog1);

})

test('Get authors  with the most blogs', () => {

    let blog1 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 7
    })

    let blog2 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 4
    })
    let blog3 = new Blog({
        title: "Hello",
        author: "George",
        url: "fake.com",
        likes: 4
    })

    let myArray = [];
    myArray.push(blog1);
    myArray.push(blog2);  
    myArray.push(blog3);  

    
    

    expect(listHelper.mostBlogs(myArray)).toEqual({ author: 'jeff', blogs: 2 });

})

test('Get authors  with the most likes', () => {

    let blog1 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 7
    })

    let blog2 = new Blog({
        title: "Hello",
        author: "jeff",
        url: "fake.com",
        likes: 4
    })
    let blog3 = new Blog({
        title: "Hello",
        author: "George",
        url: "fake.com",
        likes: 12
    })

    let myArray = [];
    myArray.push(blog1);
    myArray.push(blog2);  
    myArray.push(blog3);  

    
    

    expect(listHelper.mostLikes(myArray)).toEqual({ author: 'George', likes: 12 });

})