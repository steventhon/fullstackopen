import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else if (persons.some(person => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
        <input
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          number: 
        <input
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
          <Person key={person.name} person={person} />
        )}
      </ul>
      <div>debug newName: {newName}</div>
    </div>
  )
}

export default App
