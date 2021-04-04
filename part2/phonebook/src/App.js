import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import axios from 'axios'
import PostData from './PostData';

const App = () => {
  const [ persons, setPersons ] = useState(PostData.getAll().response) 
  const [success, setSuccess ] = useState(null)


  useEffect(() => {    
    console.log('effect')  
    PostData.getAll().then(response => {        
      console.log('promise fulfilled')        
      setPersons(response.data)
      setShownPersons(response.data)
    
    })  }, [])
  

  const [ shownPersons, setShownPersons ] = useState([
    { name: 'Arto Hellas',
      number: 123456789 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState(0)


  const handleFilter = (event) => { 
    let filterString = event.target.value
    let temp = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()));
    setShownPersons(temp);


    console.log(event.target.value)    
    setNewName(event.target.value)}
  
  
  const handleInput = (event) => { 
       console.log(event.target.value)    
       setNewName(event.target.value)}

       const handleNumber = (event) => { 
        console.log(event.target.value)    
        setNewNumber(event.target.value)}

  const handleSubmit = (event) => {
    event.preventDefault()



    let temp = persons.filter(person => person.name === newName);
    if(temp.length === 0){
      const newArray = persons.map(person => ({...person}))
      let person = {name: newName, number: newNumber}
      PostData.addNumber(person).then(response1 => {
        PostData.getAll().then(response => {
          console.log("Response data is", response.data)
          setSuccess(`It worked, ${person.name} has been added`)
          setTimeout(() => { setSuccess(null)}, 5000)
          setShownPersons(response.data);
          setPersons(response.data)

      }).catch(error => {
        setSuccess("Something went wrong")
        console.log(error)
      })

      })
    } else{
      if(window.confirm(newName + "is already added to the phone book.  Replace old number with new number?")){
        let person = {name: newName, number: newNumber}

        PostData.update(temp[0].id, person).then(response2 => {
          PostData.getAll().then(response =>{
            setSuccess(`It worked, ${person.name} has been added with a new number`)
            setTimeout(() => { setSuccess(null)}, 5000)
            setShownPersons(response.data)
            setPersons(response.data)

          }).catch(error => {
            setSuccess("Something went wrong")
            console.log(error)
          })
        })

      }

    }

       }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter = {handleFilter}/>
      <p>{success}</p>
      <h3>Add a new</h3>
      <PersonForm handleInput = {handleInput} handleNumber = {handleNumber} handleSubmit = {handleSubmit} />
      <h2>Numbers</h2>
      <Persons shownPersons = {shownPersons} setShownPersons = {setShownPersons} setSuccess = {setSuccess}/>
    </div>
  )
}

export default App