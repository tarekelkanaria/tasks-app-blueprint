import { useEffect } from "react";
import useRequest from "../../hooks/use-request";
import Task from "./Task/Task";
import classes from "./TasksList.module.css";

const TasksList = ({ onGet, all }) => {
  const { isError, isLoading, errorText, sendRequest } = useRequest();

  useEffect(() => {
    const extractData = (data) => {
      const tasksData = [];
      for (const task in data) {
        tasksData.push({ id: task, text: data[task].text });
      }
      onGet(tasksData);
    };
    sendRequest(
      {
        method: "get",
        url: "https://favorite-movies-2ce9f-default-rtdb.firebaseio.com/tasks.json",
      },
      extractData
    );
  }, [sendRequest]);

  const removeTask = (id) => {
    onGet(all.filter((task) => task.id !== id));
    sendRequest({
      method: "delete",
      url: `https://favorite-movies-2ce9f-default-rtdb.firebaseio.com/tasks/${id}.json`,
    });
  };

  const tasksElements = all.map((task) => (
    <Task key={task.id} onClose={() => removeTask(task.id)}>
      {task.text.toUpperCase()}
    </Task>
  ));

  let content;
  if (all.length) content = tasksElements;
  else if (isError)
    content = (
      <article>
        <p className="error">Something went wrong {errorText}</p>
        <button className={classes["again-btn"]} onClick={() => sendRequest()}>
          Try Again
        </button>
      </article>
    );
  else if (isLoading) content = <p className="loading">Loading ...</p>;
  return <ul className={classes["tasks-wrapper"]}>{content}</ul>;
};

export default TasksList;
