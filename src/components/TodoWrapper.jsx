import { useEffect, useState } from "react";
import "../App.css";
import Header from "./Header";
import TodoForm from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import EditTodoForm from "./EditTodoForm";
import Todo from "./Todo";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

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

    const deleteTodo = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete your todo.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#6a11cb",
            background: "#17172bff",
            color: "#ffffff",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setTodos((prev) => prev.filter((t) => t.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Deleted!",
                    text: "Your todo has been removed.",
                    timer: 1500,
                    background: "#17172bff",
                    color: "#ffffff",
                    showConfirmButton: false,
                });
            }
        });
    };



    const toggleComplete = (id) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

    const toggleEdit = (id) =>
        setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, isEditing: !t.isEditing } : t)));

    const updateTodo = (newTask, id, newDeadline) => {
        const trimmedTask = (newTask || "").trim();

        const current = todos.find((t) => t.id === id);
        if (!current)
            return toast.error("Todo not found !!!", { position: "top-right", autoClose: 2000 });

        if (!trimmedTask)
            return toast.warning("Enter a task !!!", { position: "top-right", autoClose: 2000 });

        if (!newDeadline)
            return toast.warning("Set a deadline (date & time) !!!", { position: "top-right", autoClose: 2000 });

        const sameTask = trimmedTask === current.task;
        const sameDeadline = newDeadline === current.deadline;

        if (sameTask && sameDeadline)
            return toast.info("No changes detected !!!", { position: "top-right", autoClose: 2000 });

        setTodos((prev) =>
            prev.map((t) =>
                t.id === id
                    ? { ...t, task: trimmedTask, deadline: newDeadline, isEditing: false }
                    : t
            )
        );

        toast.success("Todo updated successfully!", { position: "top-right", autoClose: 2000 });
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
        }, 5000);

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
