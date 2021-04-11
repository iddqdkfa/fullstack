

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      const user = {      
          name: 'Henry The 8th',      
          username: 'henry',      
          password: 'password'    }    
          cy.request('POST', 'http://localhost:3003/api/user/', user) 

          

    })

    
  
    
    it('Login form is shown', function() {
        cy.visit('http://localhost:3000') 
        cy.contains('username')
        cy.contains('password')
    })
    

    
  
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.request('POST', 'http://localhost:3003/api/login', 
        {      username: 'henry', password: 'password'    })
        .then(response => {      
            localStorage.setItem('user', JSON.stringify(response.body))      
          cy.visit('http://localhost:3000')    
      })

      cy.contains('Henry The 8th')



        // ...
      })
  
      
      it('fails with wrong credentials', function() {
        cy.visit('http://localhost:3000') 
        cy.contains('username')
        cy.contains('password')

        cy.request({method: 'POST',
        url: 'http://localhost:3003/api/login',
        failOnStatusCode: false,
        body: 
        {      username: 'henry', password: 'dfgh'    }
      })

        .then(response => {      
            console.log("Response was", response)
            cy.visit('http://localhost:3000')    

            cy.contains('username')
            cy.contains('password')
      })



      
        // ...
      })
    })

    

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3003/api/testing/reset')
      
            const user = {      
                name: 'Henry The 8th',      
                username: 'henry',      
                password: 'password'    }    
                cy.request('POST', 'http://localhost:3003/api/user/', user) 
      
                
      
          })





    
        it('A blog can be created', function() {
            cy.request('POST', 'http://localhost:3003/api/login', 
            {      username: 'henry', password: 'password'    })
            .then(response => {      
                localStorage.setItem('user', JSON.stringify(response.body))      
              cy.visit('http://localhost:3000')    
          })

          cy.contains('View2').click()
          cy.get('#title').type('mytitle4')    
          cy.get('#author').type('Djikstra4')    
          cy.get('#url').type("fake.com4")
          cy.get('#submitButton').click()
          cy.contains('Djikstra')
          cy.contains('mytitle')



        })

        it('A blog can be Liked', function() {
            cy.request('POST', 'http://localhost:3003/api/login', 
            {      username: 'henry', password: 'password'    })
            .then(response => {      
                localStorage.setItem('user', JSON.stringify(response.body))      
              cy.visit('http://localhost:3000')    
          })

          cy.contains('View2').click()
          cy.get('#title').type('mytitle')    
          cy.get('#author').type('Djikstra')    
          cy.get('#url').type("fake.com")
          cy.get('#submitButton').click()
          cy.get('.viewableButton').click()
          cy.get('.likeButton').click()
          cy.contains('Likes: 1')



        })

        it('A blog can be Deleted', function() {
            cy.request('POST', 'http://localhost:3003/api/login', 
            {      username: 'henry', password: 'password'    })
            .then(response => {      
                localStorage.setItem('user', JSON.stringify(response.body))      
              cy.visit('http://localhost:3000')    
          })

          cy.contains('View2').click()
          cy.get('#title').type('mytitle')    
          cy.get('#author').type('Djikstra')    
          cy.get('#url').type("fake.com")
          cy.get('#submitButton').click()
          cy.get('.viewableButton').click()
          cy.get('html').should('contain', 'Djikstra')
         cy.get('.delete').click()
         cy.get('html').should('not.contain', 'Djikstra')
                
          
          



        })

        

        it('Blogs are sorted by most likes', function() {
            cy.request('POST', 'http://localhost:3003/api/login', 
            {      username: 'henry', password: 'password'    })
            .then(response => {      
                localStorage.setItem('user', JSON.stringify(response.body))      
              cy.visit('http://localhost:3000')    
          })

          cy.contains('View2').click()
          cy.get('#title').type('mytitle')    
          cy.get('#author').type('Djikstra')    
          cy.get('#url').type("fake.com")
          cy.get('#submitButton').click()
          cy.get('.viewableButton').click()
          cy.get('.likeButton').click()
          cy.get('.likeButton').click()
          cy.get('.likeButton').click()
          cy.contains('View2').click()
          cy.get('#title').type('2')    
          cy.get('#author').type('2')    
          cy.get('#url').type("2")
          cy.get('#submitButton').click()
          cy.contains('Djikstra2').parent().find('.viewableButton').click()
          cy.contains('Djikstra2').parent().find('.likeButton').click()
          cy.contains('Djikstra2').parent().find('.likeButton').click()
          cy.contains('Djikstra2').parent().find('.likeButton').click()
          cy.contains('Djikstra2').parent().find('.likeButton').click()


          cy.contains('View2').click()
          cy.get('#title').type('3')    
          cy.get('#author').type('3')    
          cy.get('#url').type("3")
          
          cy.get('#submitButton').click()
          cy.get('.sorted').click()
          cy.wait(3000)

          cy.get('.holder').get('.sorted').click().then(() => {
            cy.wait(3000)
            cy.get('.togglableContent').eq(0)
            cy.get('.togglableContent').eq(1)
            cy.get('.togglableContent').eq(2).contains('0')



            cy.request({
                url: 'http://localhost:3003/api/blogs',
                method: 'GET',
                headers: {
                  'Authorization': `bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
              }).then((response) => {
                  const blogs = response.body
                  blogs.sort((a, b) =>   b.likes - a.likes)
                  console.log("Sorted blogs are", blogs)
                  cy.get('.sorted').click()
                  cy.wait(3000)

                  cy.get('.togglableContent').eq(0).contains(blogs[0].likes)
            cy.get('.togglableContent').eq(1).contains(blogs[1].likes)
            cy.get('.togglableContent').eq(2).contains(blogs[2].likes)


              })
              

            
          }
          )




        })




      })


  })