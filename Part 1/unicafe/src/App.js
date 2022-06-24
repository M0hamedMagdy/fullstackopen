import { useState } from "react";
import "./App.css";

function Header({ text }) {
  return <header>{text}</header>;
}

function Button({ text, handleClick }) {
  return <button onClick={handleClick}>{text}</button>;
}

function Statistics({ text, stat }) {
  if (text === "positive") {
    return (
      <tr>
        <td>
          {text} {stat} %
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        {text} {stat}
      </td>
    </tr>
  );
}

function Display({ rates }) {
  const total = rates.bad + rates.good + rates.neutral;
  const avarage = (rates.good * 1 - rates.bad * -1) / total;
  const positive = clicks.good * (100 / total);

  if (total === 0) {
    return <h3>No Feedback Given</h3>;
  }
  return (
    <>
      <table>
        <tbody>
          <Statistics text="Good" stat={rates.good} />
          <Statistics text="Neutral" stat={rates.neutral} />
          <Statistics text="Bad" stat={rates.bad} />
          <Statistics text="All" stat={total} />
          <Statistics text="Average" stat={avarage} />
          <Statistics text="Positive" stat={positive} />
        </tbody>
      </table>
    </>
  );
}

function App() {
  const title = "Give Feedback";
  const [rates, setRates] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const [allRates, addRates] = useState([]);

  function setGood() {
    const newRates = {
      ...rates,
      good: rates.good + 1,
    };
    setRates(newRates);
    addRates(allRates.concat("good"));
  }

  function setNeutral() {
    const newRates = {
      ...rates,
      neutral: rates.neutral + 1,
    };
    setRates(newRates);
    addRates(allRates.concat("neutral"));
  }

  function setBad() {
    const newRates = {
      ...rates,
      bad: rates.bad + 1,
    };
    setRates(newRates);
    addRates(allRates.concat("bad"));
  }

  return (
    <>
      <Header text={title} />
      <Button text="Good" handleClick={setGood} />
      <Button text="Neutral" handleClick={setNeutral} />
      <Button text="Bad" handleClick={setBad} />
      <Header text="Statistics" />
      <Display rates={rates} allRates={allRates} />
    </>
  );
}

export default App;
