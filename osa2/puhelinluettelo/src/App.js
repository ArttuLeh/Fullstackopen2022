import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject ={
      name: newName,
      number: newNumber,
    }

    const check = persons.some(person => {
      if (person.name === newName) {
        return true
      }
      return false
    })

    if (check) {
      setErrorMessage(`${newName} is already in phonebook, replace the old number with a new one!`)
      const personExists = persons.find(person => person.name === newName)
      const updatedPerson = { ...personExists, number: newNumber }

      personService
        .update(personExists.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    } else {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setErrorMessage(`${newName} is successfully added to phonebook`)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`${error.response.data.error}`)
          console.log(error.res.data)
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    
    personService
      .remove(id)
      .then(deletedPerson => {
        deletedPerson = persons.filter(person => person.id !== id)
        setPersons(deletedPerson)
    })
    setErrorMessage(`${person.name} is successfully deleted from phonebook`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  const filterPerson = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase()))

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>Add new</h2>
      <PersonForm
        addName={addName}
        newName={newName} handleName={handleName}
        newNumber={newNumber} handleNumber={handleNumber}
      />
      <h2>Numbers</h2>
      <Persons filterPerson={filterPerson} deletePerson={deletePerson} />
    </div>
  )
}

export default App