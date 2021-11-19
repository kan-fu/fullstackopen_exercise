import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const [message, setMessage] = useState({ message: null, type: null });

  const showMessage = (message, type) => {
    setMessage({
      message,
      type,
    });
    setTimeout(() => {
      setMessage({ message: null, type: null });
    }, 3000);
  };
  const personChange = (e) => {
    e.preventDefault();
    const personExist = persons.find((person) => person.name === newName);
    if (personExist) {
      const message = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(message)) {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        personService
          .updatePerson(personExist.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === returnedPerson.id ? returnedPerson : person
              )
            );
            setNewName("");
            setNewNumber("");
            showMessage(`Updated ${returnedPerson.name}`, "success");
          })
          .catch((error) => {
            console.log(error);
            showMessage(error.response.data.error,"warning")
            // showMessage(
              // `Information of ${newName} has already been removed from server`,
              // "warning"
            // );
            // setPersons(
              // persons.filter((person) => person.id !== personExist.id)
            // );
          });
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };
      personService.createPerson(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
        setNewName("");
        setNewNumber("");
        showMessage(`Added ${returnedPerson.name}`, "success");
      }).catch(error=>{
        showMessage(error.response.data.error, "warning")
      });
    }
  };

  const deletePerson = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showMessage(`Deleted ${name}`, "success");
      });
    }
  };

  useEffect(() => {
    personService.getAll().then((initPersons) => setPersons(initPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />

      <Filter filterName={filterName} setFilterName={setFilterName} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleSubmit={personChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={persons}
        filterName={filterName}
        handleClick={deletePerson}
      />
    </div>
  );
};

export default App;
