import { useState, useEffect } from 'react'

import axios from 'axios'

const Countries = ({ countries }) => {
  console.log('countries', countries)
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <CountryData country={countries[0]} />
  }
  return countries.map(country =>
    <Country name={country.name.common} />
  )
}

const Country = ({ name }) => {
  return <div>{name}</div>
}

const CountryData = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => {
          return <li>{language}</li>
        })}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  )
}

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect run, country is now', value)

    // skip if country is not defined
    if (value) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('response', response)
          setCountries(response.data.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())))
        })
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return (
    <>
      <div>
        find countries
        <input value={value} onChange={handleChange} />
      </div>
      <Countries countries={countries}/>
    </>
  )
}

export default App
