import React, { useReducer, useState } from "react";
import moment from "moment";
import { INITIAL_STATE, reducer } from "./reducers";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { toDoList, total } = state;

  const addToList = input =>
    dispatch({
      type: "ADD_TODO",
      payload: {
        id: Date.now(),
        title: input,
        completed: false,
        due: moment().add(3, "days")
      }
    });

  const toggleComplete = id =>
    dispatch({ type: "TOGGLE_COMPLETE", payload: id });

  const clearCompleted = () => dispatch({ type: "CLEAR_COMPLETED" });

  console.log(state);
  return (
    <div className="App">
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          input ? addToList(input) : alert("You must type something");
          setInput("");
        }}
      >
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {toDoList.length === 0 ? (
          <h3>There is no item in the list.</h3>
        ) : (
          <h3>You have total {total} items in your to-do list</h3>
        )}
        {toDoList.map(todo => (
          <li
            className={
              todo.completed
                ? "completed"
                : todo.due < Date.now()
                ? "pastdue"
                : null
            }
            key={todo.id}
            onClick={() => toggleComplete(todo.id)}
          >
            <h4>{todo.title}</h4>
            <div className="meta">
              <span>due {todo.due.endOf("day").fromNow()}</span>
              {todo.due < moment() && !todo.completed ? (
                <span>past due</span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      {total !== 0 ? (
        <div className="clear-button">
          <button onClick={clearCompleted}>Clear completed items</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
