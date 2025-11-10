import React, { useState } from "react";
import "../App.css";

const EditTodoForm = ({ updateTodo, task }) => {
    const [value, setValue] = useState(task.task);
    const [deadline, setDeadline] = useState(task.deadline || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo(value, task.id, deadline);
    };

    return (
        <form onSubmit={handleSubmit} className="input-group">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Update your task..."
            />
            <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="deadline-input"
            />
            <button type="submit">Update Task</button>
        </form>
    );
};

export default EditTodoForm;
