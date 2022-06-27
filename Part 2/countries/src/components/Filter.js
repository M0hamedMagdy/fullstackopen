function Filter({ value, onChange }) {
  return (
    <form>
      <input
        type="search"
        value={value}
        placeholder="Search..."
        onChange={onChange}
      />
    </form>
  );
}

export default Filter;
