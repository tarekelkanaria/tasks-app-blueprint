import { useRef, useState } from "react";
import useRequest from "../../hooks/use-request";
import classes from "./AddTask.module.css";

const AddTask = ({ onAdd }) => {
  const { isLoading, isError, errorText, sendRequest } = useRequest();
  const taskText = useRef(null);
  const [isValid, setIsValid] = useState(true);
  const [isWriting, setIsWriting] = useState(false);

  const handleWriting = () => {
    setIsValid(true);
    setIsWriting(true);
  };

  let enteredValue = "";

  const handleEnteredText = () => {
    enteredValue = taskText.current.value;
  };

  const handleValidation = () => {
    if (enteredValue.trim().length < 3) setIsValid(false);
    setIsWriting(false);
  };

  const extractData = (data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: enteredValue };
    onAdd(createdTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enteredValue = taskText.current.value;
    if (isValid && enteredValue.length) {
      sendRequest(
        {
          method: "post",
          url: "https://favorite-movies-2ce9f-default-rtdb.firebaseio.com/tasks.json",
          task: enteredValue,
          headers: {
            "Content-Type": "application/json",
          },
        },
        extractData
      );
    } else {
      setIsValid(false);
    }
    taskText.current.value = "";
  };

  return (
    <section className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes["user_action"]}>
          <div
            className={`${classes["user_input"]} ${
              isWriting && classes.writing
            }`}
          >
            <input
              type="text"
              ref={taskText}
              placeholder="Enter the task here"
              onChange={handleEnteredText}
              onBlur={handleValidation}
              onFocus={handleWriting}
            />
            {!isValid && (
              <p className={classes["valid-message"]}>
                This field is required with more than two characters!
              </p>
            )}
          </div>
          <button type="submit">Add Task</button>
        </div>
      </form>
      {isError ? (
        <article>
          <p className="error">Something went wrong {errorText}</p>
        </article>
      ) : isLoading ? (
        <p className="loading">Loading ...</p>
      ) : (
        ""
      )}
    </section>
  );
};

export default AddTask;
