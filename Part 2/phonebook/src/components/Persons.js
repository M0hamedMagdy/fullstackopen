function Persons({ person, deletePerson }) {
  return (
    <>
      <li key={person.id}>
        {person.name} : {person.number}
        <button onClick={() => deletePerson(person.id)}>Delete</button>
      </li>
    </>
  );
}

export default Persons;
