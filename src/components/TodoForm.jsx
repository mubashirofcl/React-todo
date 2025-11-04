import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "../App.css";

const TodoForm = ({ addTodo }) => {
    const [task, setTask] = useState("");
    const [deadline, setDeadline] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return toast.warning("Enter a task !!!");
        if (!deadline) return toast.warning("Set a deadline (date & time) !!!");
        addTodo(task.trim(), deadline);
        setTask("");
        setDeadline("");
    };

    return (<>
        <form onSubmit={handleSubmit} className="input-group">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="What is the task today?"
            />
            <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="deadline-input"
            />
            <button type="submit">Add Task</button>
        </form>
        <ToastContainer /></>

    );
};

export default TodoForm;
