import React from 'react';
import Display from './Display';

const Persons = ({ persons, filtered }) => {
  return (
    <ol className="list-group list-group-numbered">
      {filtered.length
        ? filtered.map((person) => (
            <Display
              key={person.name}
              name={person.name}
              number={person.number}
            />
          ))
        : `User not found`}
    </ol>
  );
};

export default Persons;
