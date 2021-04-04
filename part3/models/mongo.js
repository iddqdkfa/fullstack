const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

/*
if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}


const password = process.argv[2]

const personName = process.argv[3]

const personNumber = process.argv[4]
const person = new Person({
  name: personName,
  number: personNumber
})

if(process.argv.length == 3){
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
} else{
    person.save().then(result => {
        console.log('note saved!')
        console.log(result)
        mongoose.connection.close()
      }).catch(err => console.log(err))

}

*/


const url = process.env.MONGODB_URI

console.log("URL is", url)
console.log("About to connect to database")

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => console.log("Connected to database"))
.catch(error => console.log("Something went wrong", error.message))



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  number: {
    type: Number,
    minlength: 8,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)

