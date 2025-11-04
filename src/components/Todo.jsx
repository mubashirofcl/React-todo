import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash, faClock } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ task, deleteTodo, toggleEdit, toggleComplete }) => {
  const now = new Date();
  const hasDeadline = !!task.deadline;
  const deadlineDate = hasDeadline ? new Date(task.deadline) : null;
  const isOverdue = hasDeadline && !task.completed && deadlineDate < now;

  return (
    <div className="task-list">
      <div className={`task ${task.completed ? "completed" : "incompleted"} ${isOverdue ? "overdue" : ""}`}>
        <div className="task-text" onClick={() => toggleComplete(task.id)}>
          <p>{task.task}</p>
          {hasDeadline && (
            <div className="deadline">
              <FontAwesomeIcon icon={faClock} className="clock-icon" />
              <span>
                {deadlineDate.toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}
                {isOverdue ? "  — ⚠️ Overdue" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="icons">
          <FontAwesomeIcon className="edit" icon={faPenToSquare} onClick={() => toggleEdit(task.id)} />
          <FontAwesomeIcon className="delete" icon={faTrash} onClick={() => deleteTodo(task.id)} />
        </div>
      </div>
    </div>
  );
};

export default Todo;
