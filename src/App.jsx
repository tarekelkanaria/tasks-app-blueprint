import { useState } from "react";
import AddTask from "./components/AddTask/AddTask";
import TasksList from "./components/TasksList/TasksList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  const updateTasks = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const getTasks = (tasks) => {
    setTasks(tasks);
  };

  return (
    <main>
      <AddTask onAdd={updateTasks} />
      <TasksList onGet={getTasks} all={tasks} />
    </main>
  );
}

export default App;
