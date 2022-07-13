import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

function Filter() {
  const dispatch = useDispatch();
  function handleChange(e) {
    dispatch(filterChange(e.target.value));
  }
  const style = {
    marginBottom: 10,
  };

  return (
    <form style={style}>
      <label htmlFor="filter">
        Filter:{" "}
        <input
          onChange={handleChange}
          type="text"
          id="filter"
          placeholder="Search For Anecdotes"
        />
      </label>
    </form>
  );
}

export default Filter;
