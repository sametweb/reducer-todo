import React, { useReducer, useState } from "react";
import { INITIAL_STATE, reducer } from "./reducers";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { toDoList, total } = state;

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
          dispatch({
            type: "ADD_TODO",
            payload: {
              id: Date.now(),
              title: input,
              completed: false,
              due: new Date(new Date().setDate(new Date().getDate() + 1))
            }
          });
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
          <h3>Total {total} items</h3>
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
            <h3>{todo.title}</h3>
            <div className="meta">
              <span>Due: {todo.due.toDateString()}</span>
              {todo.due < Date.now() && !todo.completed ? (
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
