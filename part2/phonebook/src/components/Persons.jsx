import React from "react";

const Persons = ({ persons, filterName, handleClick }) => {
  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      {personsToShow.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleClick(person.name, person.id)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
