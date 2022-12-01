import { useEffect, useState } from 'react';
import axios from 'axios';

import Search from './Search';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNumber] = useState('');
  const [filtered, setFiltered] = useState(persons);
  console.log(filtered);
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((res) => {
      setPersons(res.data);
      setFiltered(res.data);
    });
  }, []);

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
    console.log(query);
    let updatedList = persons.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase());
    });

    setFiltered(updatedList);
  };

  return (
    <div className="container mt-3 w-50 ">
      <h2 className="h1">Phonebook</h2>

      <Search onChange={filterPersons} />

      <br />
      <br />
      <h3>Add a new person</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filtered={filtered} />
    </div>
  );
};

export default App;
