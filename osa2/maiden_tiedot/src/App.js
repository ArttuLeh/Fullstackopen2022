import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './Components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [findCountry, setFindCountry] = useState('')
  const [country, setCountry] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setFindCountry(event.target.value)
    setCountry(countries.map(country => 
      country))
  }

  const searchCountry = country.filter(country => 
    country.name.common.toLowerCase().includes(findCountry))

  return (
    <div>
      find countries <input value={findCountry} onChange={handleSearch} />
      <Filter 
        countries={searchCountry}
        country={country} 
        findCountry={findCountry} 
        setCountry={setCountry} 
        />
    </div>
  )
}

export default App
