import { useState, useEffect } from "react";

// code that handles the communication with the backend (Part 8)
import personService from "./services/persons";

// Refactoring into compomemts (Step 5)
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Enter Your Name...");
  const [newNumber, setNewNumber] = useState("Enter Your Number...");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState(null);

  // Using useEffect and Axios (Step 6)
  function hookGet() {
    personService.getAll().then((allPersons) => {
      setPersons(allPersons);
    });
  }

  useEffect(hookGet, []);

  // Function to Create AND add New Person Name & Number (Step 1 & 3)
  function addPerson(e) {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    // Check if Name exists (Step 2)
    if (persons.some((person) => person.name === personObject.name)) {
      alert(
        `${
          newName === "Arto Hellas" ? "Arto Hellas" : newName
        } is already added to phonebook`
      );
    } else {
      // Add New Person to db (Part 7 )
      personService.addNew(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setMessage(`${newPerson.name} Is Now in the PhoneBook`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }
    setNewName("");
    setNewNumber("");
  }

  // Delete Names (Step 9 )
  const deleteName = (person) => {
    const message = `Delete ${person.name}?`;
    const confirm = window.confirm(message);
    if (confirm) {
      personService
        .deletePerson(person.id)
        .then((persons) => setPersons(persons));
    }
  };

  // functions To handle the form input change
  // 1.Name
  function handleNameChange(e) {
    setNewName(e.target.value);
  }

  // 2.Number
  function handleNumberChange(e) {
    setNewNumber(e.target.value);
  }
  // 3.Search Value
  function handleFilterChange(e) {
    setNewFilter(e.target.value);
    const regex = new RegExp(newFilter, "i");
    const filteredPersons = () =>
      allPersons.filter((person) => person.name.match(regex));
    setPersons(filteredPersons);
  }

  // Search (Step 4)
  const personsToShow = newFilter
    ? persons.filter((person) => person.name.toLowerCase().includes(newFilter))
    : persons;

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification message={message} />
      <h3>Search For A Name</h3>
      <Filter value={newFilter} onChange={handleFilterChange} />
      <h3>Add A new</h3>
      <PersonForm
        onSubmit={addPerson}
        labal="Name"
        nameValue={newName}
        numberValue={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <Persons
            key={person.name}
            person={person}
            deletePerson={() => deleteName(person)}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
