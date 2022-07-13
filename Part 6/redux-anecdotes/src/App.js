import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Header from "./components/Header";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
  return (
    <>
      <Notification />
      <Header title="Anecdotes" />
      <Filter />
      <AnecdoteList />
      <Header title="Create New Anecdote" />
      <AnecdoteForm />
    </>
  );
};

export default App;
