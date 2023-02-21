import React from "react";
import logo from "./logo.svg";
import { Counter } from "../../../features/counter/Counter";
import "./App.css";
import { Tasks } from "../../../features/tasks/components/tasks/tasks";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function App() {
  // Acá tomamos el estado desde el Store para luego pintarlo más abajo:
  // useSelector le damos en la Callback el estado entero y luego tomamos el que necesitamos.
  const tasks = useSelector((state: RootState) => state.tasks);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Tareas disponibles {tasks.length}</p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
      <Tasks></Tasks>

      {/* Puedo generar un boolean que guardo en una rama nueva del State para que cuando sea true, se pinte el Error: */}
      {/* Luego puedo agregar un onClick al elemento para gestionar quitar el mensaje. */}
      {/* {hasError && <p onClick....>Info de error: {errorMessage}</p> } */}
    </div>
  );
}

export default App;
