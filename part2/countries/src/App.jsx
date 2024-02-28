import { useState, useEffect } from 'react'

import axios from 'axios'

const Countries = ({ countries, toggleCountryData }) => {
  console.log('countries', countries)
  console.log('countries.length', countries.length)
  if (countries.length > 10) {
    console.log('countries length > 10')
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    console.log('countries length === 1')
    return <CountryData country={countries[0]} />
  }
  console.log('countries length < 10 and > 1')
  return countries.map(country =>
    <Country key={country.name.common} country={country} toggleCountryData={toggleCountryData} />
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
            return <li key={language}>{language}</li>
          })}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
        <h3>Weather in {country.capital}</h3>
        <div>temperature {country.capitalInfo.weather.temperature} Celsius</div>
        <img src={country.capitalInfo.weather.icon} alt={country.capitalInfo.weather.alt} />
        <div>wind {country.capitalInfo.weather.wind} m/s</div>
      </>
    )
  }
}

function App() {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(() => {
    console.log('effect run, country is now', value)

    // skip if country is not defined
    if (value) {
      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('response', response)
          const filteredCountries = response.data.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())).map(c => { return { ...c, isExpanded: false } })
          console.log('filteredCountries.length', filteredCountries.length)
          if (filteredCountries.length === 1) {
            console.log('filteredCountries 1')
            getWeatherDataSingle({ ...filteredCountries[0], isExpanded: true })
          } else {
            console.log('filteredCountries > 1')
            setCountries(filteredCountries)
          }
        })
    }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const getWeatherDataSingle = (country) => {
    console.log('getWeatherDataSingle for', country)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log('response', response)
        country.capitalInfo.weather = {
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          alt: response.data.weather[0].main }
          setCountries([country])
      })
  }

  const getWeatherData = (country) => {
    console.log('getWeatherData for', country)
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log('response', response)
        country.capitalInfo.weather = {
          temperature: response.data.main.temp,
          wind: response.data.wind.speed,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          alt: response.data.weather[0].main }
          setCountries(countries.map(c => c.name.common === country.name.common ? country : c ))
      })
  }

  const toggleCountryData = (country) => {
    let changedCountry = { ...country, isExpanded: !country.isExpanded }
    if (changedCountry.isExpanded) {
      getWeatherData(changedCountry)
    } else {
      setCountries(countries.map(c => c.name.common === country.name.common ? changedCountry : c ))
    }
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
