import { useState, useEffect } from 'react'

import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
    filter shown with 
      <input
        value={props.inputValue}
        onChange={props.inputOnChange}
      />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.formOnSubmit}>
      <div>
        name: 
      <input
        value={props.newName}
        onChange={props.handleNameChange}
      />
      </div>
      <div>
        number: 
      <input
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, handleDelete }) => {
  return persons.map(person => 
    <Person key={person.id} person={person} handleDelete={handleDelete}/>
  )
}

const Person = ({ person, handleDelete }) => {
  return (
    <li>
      {person.name} {person.number} 
      <button onClick={() => handleDelete(person)}>Delete</button>
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')
  
  const addPerson = (event) => {
    event.preventDefault()

    const person = persons.find(p => p.name === newName)
    if (person === undefined) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...person, number: newNumber }

      personService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
    }
  }

  const handleFilterNameChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const personsToShow = filterName.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
          inputValue={filterName}
          inputOnChange={handleFilterNameChange}
        />
      <h3>Add a new</h3>
      <PersonForm formOnSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={deletePerson}/>
    </div>
  )
}

export default App
