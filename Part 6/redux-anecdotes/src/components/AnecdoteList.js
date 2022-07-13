import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

function Anecdote({ anecdote, handleClick }) {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
}

function AnecdoteList() {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === null) {
      return anecdotes;
    }
    const regex = new RegExp(filter, "i");
    return anecdotes.filter((anecdote) => anecdote.content.match(regex));
  });
  const byVotes = (a, b) => b.votes - a.votes;

  function handleVotes(anecdote) {
    dispatch(vote(anecdote.id));
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5));
  }

  return (
    <>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => handleVotes(anecdote)}
        />
      ))}
    </>
  );
}

export default AnecdoteList;
