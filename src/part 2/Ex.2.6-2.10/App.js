import { useState } from 'react';
import Display from './Display';
import Search from './Search';
import PersonForm from './PersonForm';
import Person from './Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [filtered, setFiltered] = useState(persons);

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    setPersons(persons.concat(newPerson));
    setFiltered(persons.concat(newPerson));
    setNewName('');
    setNumber('');
  };

  const handleNameChange = (e) => {
    //console.log(e.target.value);
    setNewName(e.target.value);

    checking(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  //Check if person already exist in our book
  const checking = (value) => {
    return persons.map((person) => {
      if (person.name === value)
        alert(`${value} is already added to phonebook`);
    });
  };
  //search for person
  const filterPersons = (e) => {
    const query = e.target.value;
    //let updatedList = [...persons];
    let updatedList = persons.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

    setFiltered(updatedList);
  };
  console.log(filtered);

  return (
    <div className="container mt-3 w-50 ">
      <h2 className="h1">Phonebook</h2>

      <Search onChange={filterPersons} />

      <br />
      <br />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Person filtered={filtered} />
    </div>
  );
};

export default App;
