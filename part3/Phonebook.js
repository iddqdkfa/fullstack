
require('dotenv').config()
const express = require('express');
var morgan = require('morgan')
const cors = require('cors')
const PersonConnection = require('./models/mongo');

const errorHandler = (error, request, response, next) => {
  console.log("I am in first block")
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {    
    return response.status(400).json({ error: error.message })  }
    else {
      return response.status(400).json({ error: error.message })
    }

  next(error)
}




const app = express()

app.use(cors())

app.use(express.json())
app.use(express.static('build'))




//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))

let persons = [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    { 
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345",
      "id": 3
    },
    { 
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122",
      "id": 4
    }
  ]

  app.post('/api/new', (request, response, next) => {


    const body = request.body
    console.log("body is", body)
    console.log("body content is", body.content)


    if (body === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    
    let number = Number(body.number)
    console.log("name is", body.name)
    console.log("Number is", body.number)
    console.log("Number type is", typeof(body.number))
    console.log("Number type is", typeof(number))


const person = new PersonConnection({
  name: body.name,
  number: body.number
})

person.save()
.then(savedPerson => {
      response.json(savedPerson)
    }).catch(error =>{
      console.log("Error is", error.message)
      console.log("I am in the error 2")
      next(error)

      })


    /*
 

    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id)) 
      : 0
  
      console.log(persons.find(p => p.name == request.body.name || p.number === request.body.number))

      if(persons.find(p => p.name == request.body.name || p.number === request.body.number)){
        return response.status(400).json({ 
            error: 'Person or number already in phonebook' 
          })
      }
      
    let person = request.body
    let perso2 = JSON.parse(JSON.stringify(request.body))
    morgan.token('type', function (req, res) { 

        return JSON.stringify(perso2) })


    person.id = maxId + 1
  
    persons = persons.concat(person)
  
    response.json(person)

    */
  })

  app.put('/api/:id', (request, response, next) => {
    const body = request.body
  
    const person = {
      name: body.name,
      number: body.number,
    }


    /*

    PersonConnection.findOneAndUpdate({name: person.name}, person, { runValidators: true, context: 'query' })
    .catch(err => console.log("I'm in 1") )

    console.log("old person", body)
    console.log("new person", person)
    PersonConnection.findById(request.params.id).then(p => {
      PersonConnection.findOneAndUpdate({name: p.name, number: p.number}, person, { runValidators: true, context: 'query' })
      .catch(err => console.log("I'm in 1") )
      .then(p2 => response.json(p2))
      .catch(err => console.log("I'm in 2"))
    
    })

*/

  
    PersonConnection.findByIdAndUpdate(request.params.id, person, { runValidators: true, context: 'query' } )
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))

      
  })


  
  app.delete('/api/delete/:id', (request, response, next) => {
    
    morgan.token('type', function (req, res) { 

      return JSON.stringify('test') })

      
    console.log("I am in delete")
  const id = Number(request.params.id)

  PersonConnection.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))

 // persons = persons.filter(person => person.id !== id)

 // response.status(204).end()
})

app.get('/api/persons', (request, response, next) => {

  
  morgan.token('type', function (req, res) { 

    return JSON.stringify('test') })

    
    PersonConnection.find({}).then(persons => {
      console.log("persons is", persons)
      response.json(persons)
    }).catch(error => next(error))
    console.log(response.body)
})

app.get('/api/persons/:id', (request, response, next) => {



  morgan.token('type', function (req, res) { 

    return JSON.stringify('test') })

    const id = Number(request.params.id)
    console.log(id)
    //const person = persons.find(person => person.id === id)
   // console.log(person)

    PersonConnection.findById(request.params.id).then(person => {
      response.json(person)
    }).catch(error => next(error))

    /*

    if(person){
        response.json(person)

    } else{
        response.status(404).end()
    }
    */


  })


app.get('/info', (request, response) => {
  morgan.token('type', function (req, res) { 

    return JSON.stringify('test') })
    let count = persons.length;

    let date = new Date()

  response.send(`<p>Phonebook has infor for ${count} people</p> <p>${date}</p>`)
})


app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

   
  