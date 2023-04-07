import { AiFillCloseCircle } from "react-icons/ai";
import classes from "./Task.module.css";

const Task = ({ onClose, children }) => {
  return (
    <li className={classes.wrapper}>
      <div></div>
      <p className={classes.task}>{children}</p>
      <div className={classes.close}>
        <AiFillCloseCircle
          style={{
            fontSize: "3rem",
            color: "red",
            cursor: "pointer",
          }}
          onClick={onClose}
        />
      </div>
    </li>
  );
};

export default Task;
