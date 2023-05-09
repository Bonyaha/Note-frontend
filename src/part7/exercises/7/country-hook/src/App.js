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
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        )
        setCountry({ found: true, data: response.data[0] })
      } catch (error) {
        setCountry({ found: false })
      }
    }

    if (name) {
      fetchCountry()
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return <div>not found...</div>
  }
  const { name, capital, population, flags } = country.data
  return (
    <div>
      <h3>{name.common} </h3>
      <div>capital {capital[0]} </div>
      <div>population {population}</div>
      <img src={flags.svg} height='100' alt={`flag of ${name.common}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)
  console.log('country', country)
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }
  console.log(name)
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
