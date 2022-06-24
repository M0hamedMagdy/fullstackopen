import { useState } from "react";

function Header({ name }) {
  return <h2>{name}</h2>;
}

function Anecdote({ text, votesCount }) {
  return (
    <>
      <p>{text}</p>
      <p>has {votesCount} votes</p>
    </>
  );
}

function Winner({ anecdotes, allVotes }) {
  const highestVoteCount = Math.max(...allVotes);
  const winnerIndex = allVotes.indexOf(highestVoteCount);
  const winner = anecdotes[winnerIndex];

  if (highestVoteCount === 0) {
    return <p>There are No votes</p>;
  }

  return (
    <>
      <p>{winner}</p>
      <p>has {highestVoteCount} votes</p>
    </>
  );
}

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [allVotes, setAllVotes] = useState(Array(6).fill(0));

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes];
    newAllVotes[selected] += 1;
    setAllVotes(newAllVotes);
  };

  const handleAnecdoteClick = () => {
    const arrayIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(arrayIndex);
  };

  return (
    <div>
      <Header name="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleAnecdoteClick} text="Next anecdote" />

      <Header name="Anecdote with most votes" />
      <Winner anecdotes={anecdotes} allVotes={allVotes} />
    </div>
  );
};

export default App;
