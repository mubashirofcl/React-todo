import { useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoWrapper() {
    const [todos, setTodos] = useState([]);

    const addTodo = (task, deadline) => {
        setTodos((prev) => [
            ...prev,
            {
                id: uuidv4(),
                task,
                completed: false,
                isEditing: false,
                deadline,
                notified: false
            },
        ]);
    };

    const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));

    const toggleComplete = (id) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

    const toggleEdit = (id) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isEditing: !t.isEditing } : t)));

    const updateTodo = (newTask, id, newDeadline) => {
        setTodos((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, task: newTask, deadline: newDeadline, isEditing: false } : t
            )
        );
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTodos((prev) =>
                prev.map((t) => {
                    if (t.deadline && !t.completed && !t.notified && new Date(t.deadline) < now) {
                        toast.warning(`"${t.task}" is overdue!`, { position: "top-right", autoClose: 4000, theme: "dark" });
                        return { ...t, notified: true };
                    }
                    return t;
                })
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Header />
            <div className="main">
                <div className="container">
                    <h1>Get Things Done!</h1>

                    <TodoForm addTodo={addTodo} />

                    {todos.length === 0 && <p>No tasks added - !</p>}

                    {todos.map((todo) =>
                        todo.isEditing ? (
                            <EditTodoForm key={todo.id} updateTodo={updateTodo} task={todo} />
                        ) : (
                            <Todo
                                key={todo.id}
                                task={todo}
                                deleteTodo={deleteTodo}
                                toggleEdit={toggleEdit}
                                toggleComplete={toggleComplete}
                            />
                        )
                    )}
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default TodoWrapper;
