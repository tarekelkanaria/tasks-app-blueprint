import { useState } from "react";
import useRequest from "../../hooks/use-request";
import classes from "./AddTask.module.css";

const AddTask = ({ onAdd }) => {
  const { isLoading, isError, errorText, sendRequest } = useRequest();

  const [taskText, setTaskText] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validText = taskText.trim().length > 3;
  const invalidInput = !validText && isTouched;

  const handleEnteredText = (e) => {
    setTaskText(e.target.value);
    setIsTouched(false);
  };

  const handleBlurValidation = () => {
    setIsTouched(true);
  };

  const extractData = (data) => {
    const generatedId = data.name;
    const createdTask = { id: generatedId, text: taskText };
    onAdd(createdTask);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTouched(true);

    if (!validText) {
      return;
    }

    sendRequest(
      {
        method: "post",
        url: "https://favorite-movies-2ce9f-default-rtdb.firebaseio.com/tasks.json",
        task: taskText,
        headers: {
          "Content-Type": "application/json",
        },
      },
      extractData
    );
    setIsTouched(false);
    setTaskText("");
  };

  return (
    <section className={classes.container}>
      <form onSubmit={handleSubmit}>
        <div className={classes["user_action"]}>
          <div
            className={`${classes["user_input"]} ${
              invalidInput && classes.writing
            }`}
          >
            <input
              type="text"
              placeholder="Enter the task here"
              value={taskText}
              onChange={handleEnteredText}
              onBlur={handleBlurValidation}
            />
            {invalidInput && (
              <p className={classes["valid-message"]}>
                This field is required with more than three characters!
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
