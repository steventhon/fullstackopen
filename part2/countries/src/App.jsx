import { useState, useEffect } from 'react'

import axios from 'axios'

const Countries = ({ countries, toggleCountryData }) => {
  console.log('countries', countries)
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    return <CountryData country={{ ...countries[0], isExpanded: true }} />
  }
  return countries.map(country =>
    <Country country={country} toggleCountryData={toggleCountryData} />
  )
}

const Country = ({ country, toggleCountryData }) => {
  return (
    <div>
      {country.name.common}
      <button onClick={() => toggleCountryData(country)}>{country.isExpanded ? "unshow" : "show"}</button>
      <CountryData country={country} />
    </div>
  )
}

const CountryData = ({ country }) => {
  if (country.isExpanded) {
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
          setCountries(response.data.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())).map(c => { return { ...c, isExpanded: false } }))
        })
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const toggleCountryData = (country) => {
    setCountries(countries.map(c => {
      if (c.name.common === country.name.common) {
        return {...c, isExpanded: !country.isExpanded}
      }
      return c
    }))
  }

  return (
    <>
      <div>
        find countries
        <input value={value} onChange={handleChange} />
      </div>
      <Countries countries={countries} toggleCountryData={toggleCountryData}/>
    </>
  )
}

export default App
