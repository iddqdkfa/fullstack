import React, { useState, useEffect } from 'react';
import axios from 'axios'



const CountryList = (props) => {
  const [ showCountry, setShowCountry ] = useState('')
  const [weather, setWeather] = useState('')
  let temp;


  const test = (country, show) => {
    country.show = true
  console.log("Is click working", country )
  show(country.name)
    return( <p>Am I working</p>)
  }

  console.log('SHOW COUNTRY IS', showCountry)

  if(props.visibleCountries.length > 10){
    return(
    <div>
      <p>Too many matches, specify another filter</p>
    </div>
    )
  } else if (props.visibleCountries.length >1){
    console.log(props.visibleCountries)
    return(
      <div>
        {props.visibleCountries.map((country) => 
        
        {
          console.log("coutry show is", country.name)
          console.log("coutry hook is", showCountry)

          if(showCountry === country.name){
            console.log(country.name, "Is show", country.show)
            axios.get('http://api.weatherstack.com/current?access_key=88fddc3a3fb486840c42c7d8776f679a&query=New%20York')
              .then(response =>{
                temp =response.data
                console.log("temp is", temp)

              })

            return (<div>
                      <Country country = {country} weather = {temp}/>

    
              </div>) 
          } else{
            return (<div>
              <p key= {country}>{country.name} <button onClick= {() => setShowCountry(country.name)}>Show</button></p> 
    
              </div>)
          }

        }
        
        )}
      </div>
      )
  } else if(props.visibleCountries.length ==1){

    return(
      <div>
        <Country country = {props.visibleCountries[0]}/>
      </div>
      )
  }
  
  else {
    return(
      <div>
        <p>Loading</p>
      </div>
      )
  }

}

const Weather = (props) => {

  return (
    <div>
       <p>Weather in {props.country}</p>
       <p>Temperature  {props.temperature}</p>
       <p>Wind {props.wind}</p>

    </div>

  )
 


}

const Country = (props) => {
console.log("Props is", props)

  return (
    <div>
      <h2>{props.country.name}</h2>
      <p>capital {props.country.capital}</p>
      <p>population {props.country.population}</p>
      <h3>languages</h3>
      <ul>
      {props.country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src = {props.country.flag}></img>
    </div>
  )
}



const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ visibleCountries, setVisibleCountries ] = useState(countries)




  useEffect(() => {  
    console.log('effect')  
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {        
      console.log('promise fulfilled')   
      console.log("Promise is", response.data)  
      axios.get('http://api.weatherstack.com/current?access_key=88fddc3a3fb486840c42c7d8776f679a&query=New%20York')
      .then(response =>{
        console.log(response.data)

      })

      response.data.forEach(element => {
        element.show = false
      });
      setCountries(response.data) 
      setVisibleCountries(response.data);

    

   
    })  }, [])
  


  const handleFilter = (event) => { 
    let filterString = event.target.value
    let temp = countries.filter(country => country.name.toLowerCase().includes(filterString.toLowerCase()));
    console.log("Visible country length", temp.length)
    setVisibleCountries(temp);
  }
  
  


  return (
    <div>
       find countries: <input onChange={handleFilter}        />
      <CountryList  visibleCountries = {visibleCountries}/>
    </div>
  )
}

export default App