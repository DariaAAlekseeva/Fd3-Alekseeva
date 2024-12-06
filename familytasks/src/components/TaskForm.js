import { useState } from "react";
import './TaskForm.css';
import './TaskForm_adapt.css';

function TaskForm({ onAddTask, users }) {
    const [newTask, setNewTask] = useState('');
    const [assignedTo, setAssignedTo] = useState("общее")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask.trim()) {
            onAddTask({ text: newTask, assignedTo });
            setNewTask('');
            setAssignedTo("общее");
        }
    }

    return (
        <form className="taskForm" onSubmit={handleSubmit}>

            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Введите задачу"
            />
            <select onChange={(e) => setAssignedTo(e.target.value)} value = {assignedTo}>
                {users.map((user) => (
                    <option key={user.id} value={user.username}>
                        {user.username}
                    </option>
                ))}
                <option value="общее">общее</option>
            </select>
            <button type="submit">Добавить задачу</button>

        </form>
    )
}

export default TaskForm;