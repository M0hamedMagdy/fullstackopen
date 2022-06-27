function PersonForm({
  onSubmit,
  nameValue,
  numberValue,
  onNameChange,
  onNumberChange,
}) {
  function clearOnFocus(e) {
    return (e.target.value = "");
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="#input">Name: </label>
        <input
          type="text"
          onFocus={clearOnFocus}
          value={nameValue}
          onChange={onNameChange}
        />
      </div>
      <div>
        <label htmlFor="#input">Number: </label>
        <input
          type="text"
          onFocus={clearOnFocus}
          value={numberValue}
          onChange={onNumberChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
}

export default PersonForm;
