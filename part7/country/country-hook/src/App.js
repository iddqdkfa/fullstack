import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [capital, setCapital] = useState(null)
  const [population, setPopulation] = useState(null)
  const [flag, setFlag] = useState(null)
  const [found, setFound] = useState(false)


  useEffect(() => {

    
    axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(response =>{
      let temp =response.data
      console.log("temp is", temp)
      setCapital(temp[0].capital);
      setCountry(temp[0].name)
      setFlag(temp[0].flag)
      setPopulation(temp[0].population)
      setFound(true);
    }).catch(() => {
      console.log("in catch")
      setFound(false);

    })
  }, [name])

  return {
    data: {
      name,
      capital,
      population,
      flag
    },
    found
    

  }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
