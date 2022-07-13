import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  const good = (e) => {
    console.log(store.getState().good);
    store.dispatch({
      type: "GOOD",
    });
  };

  const bad = (e) => store.dispatch({ type: "BAD" });
  const ok = (e) => store.dispatch({ type: "OK" });
  const reset = (e) => store.dispatch({ type: "ZERO" });

  return (
    <div>
      <button onClick={good}>good</button>
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok: {store.getState().ok}</div>
      <div>bad: {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
