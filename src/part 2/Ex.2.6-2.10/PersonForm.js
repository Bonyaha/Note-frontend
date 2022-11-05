import React from 'react';

const PersonForm = (props) => {
  let { addPerson, newNumber, handleNameChange, handleNumberChange, newName } =
    props;

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        {''}
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" className="btn btn-success btn-sm">
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
