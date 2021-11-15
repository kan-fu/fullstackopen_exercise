import React from "react";

const PersonForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='form-name'>name: </label>
        <input
          id='form-name'
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type='text'
        />
        <label htmlFor='form-number'>number: </label>
        <input
          id='form-number'
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          type='text'
        />
        <button type='submit'>add</button>
      </form>
    </>
  );
};

export default PersonForm;
