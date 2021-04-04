import React from 'react';
import PostData from './PostData';




const Persons = (props) => {

    const checkDelete = (person) => {

        if(window.confirm(`Are you sure you want to delete ${person.name}`)){
            PostData.deleteUser(person.id)
            .then(() => PostData.getAll().then(response => props.setShownPersons(response.data)))
            .catch(error => {
                props.setSuccess("Something went wrong")
                console.log(error)
              })
            
            
            
        }
    
    }

    
    return ( props.shownPersons.map(person => <p key = {person.name}>{person.name } {person.number}  <button onClick={() => checkDelete(person)} >Delete</button> </p>) )

}

export default Persons