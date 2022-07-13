import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

function AnecdoteForm() {
  const dispatch = useDispatch();

  function addAnecdote(e) {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  }

  return (
    <form onSubmit={addAnecdote}>
      <div>
        <input placeholder="Create New Anecdote" name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
}
export default AnecdoteForm;
