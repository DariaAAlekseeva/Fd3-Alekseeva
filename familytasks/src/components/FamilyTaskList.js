import './FamilyTaskList.css';
import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import Login from './Login';

function FamilyTaskList() {


    const [currentUser, setCurrentUser] = useState(''); 
    const [taskList, setTaskList] = useState([]); 
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('all'); 
    const [isLoading, setIsLoading] = useState(false);
    const [hideCompleted, setHideCompleted] = useState(false);


    const BASE_USERS_URL = "https://6750ad6069dc1669ec1bf88c.mockapi.io/users";
    const BASE_TASKS_URL = "https://6750ad6069dc1669ec1bf88c.mockapi.io/tasks";

    useEffect(() => {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, []);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(BASE_USERS_URL);
                const data = await response.json();
                setUsers(data);

            } catch (error) {
                console.error("Ошибка при загрузке пользователей", error);
            }
        }
        fetchUsers();
    }, []);


    useEffect(() => {
        async function fetchTasks() {
            setIsLoading(true);
            try {
                const response = await fetch(BASE_TASKS_URL);
                const tasks = await response.json();
                setTaskList(tasks); 
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTasks();
    }, []);


    const addTask = async (task) => {
        try {
            const response = await fetch(BASE_TASKS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task),
            });
            const newTask = await response.json();
            setTaskList((prevTasks) => [...prevTasks, newTask]);
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
        }
    };


    const removeTask = async (taskId) => {
        const taskElement = document.querySelector(`li[datataskid="${taskId}"]`);
        if (taskElement) {

            taskElement.classList.add("removing");

            setTimeout(async () => {
                try {
                    await fetch(`${BASE_TASKS_URL}/${taskId}`, {
                        method: "DELETE",
                    });
                    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                } catch (error) {
                    console.error("Ошибка при удалении задачи:", error);
                }
            }, 300);
        }
    };

    const isTaskCompleted = async (taskId) => {
        const taskToUpdate = taskList.find((task) => task.id === taskId);
        if (!taskToUpdate) return;

        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

        try {
            await fetch(`${BASE_TASKS_URL}/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask),
            });

            setTaskList((prevTasks) =>
                prevTasks.map((task) => (task.id === taskId ? updatedTask : task))
            );
        } catch (error) {
            console.error("Ошибка при обновлении задачи:", error);
        }
    };

    const handleLoginSuccess = (username) => {
        setCurrentUser(username);
        localStorage.setItem('currentUser', username);
    };


    const handleExit = () => {
        setCurrentUser('');
        localStorage.removeItem('currentUser');
    };

    const filteredTasks = taskList.filter((task) => {
        if (hideCompleted && task.completed) return false;
        if (filter === 'all') return true;
        if (filter === 'mine') return task.assignedTo === currentUser;
        if (filter === 'common') return task.assignedTo === "общее";
        return true;
    });

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;


    const paginatedTasks = filteredTasks.slice(
        (currentPage - 1) * tasksPerPage,
        currentPage * tasksPerPage
    );

    const listItems = paginatedTasks.map((task) => (
        <li key={task.id} className="taskItem" datataskid={task.id}>
            <span className={task.completed ? "completed" : ""}>
                {task.text} - {task.assignedTo}
            </span>
            <div>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => isTaskCompleted(task.id)}
                />
                <button onClick={() => removeTask(task.id)}>Удалить</button>
            </div>
        </li>
    ));

    const setFilterWithReset = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    if (isLoading) {
        return <div>Загрузка задач...</div>;
    }

    if (!currentUser) {
        return <Login handleLoginSuccess={handleLoginSuccess} />;
    }

    return (
        <div className='container'>

            <h3 className='greeting'>Менеджер задач семьи</h3>
            <div className='controlButtons'>
                <div className='filterButtons'>
                    <button
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilterWithReset('all')}
                    >
                        Все задачи
                    </button>
                    <button
                        className={filter === 'mine' ? 'active' : ''}
                        onClick={() => setFilterWithReset('mine')}
                    >
                        Мои задачи
                    </button>
                    <button
                        className={filter === 'common' ? 'active' : ''}
                        onClick={() => setFilterWithReset('common')}
                    >
                        Общие задачи
                    </button>
                </div>

                <button
                    className='exitButton'
                    onClick={handleExit}
                >
                    Выйти
                </button>
            </div>

            <TaskForm onAddTask={addTask} users={users} />
            <div className='hideCompleted'>
                <label>
                    <input
                        type='checkbox'
                        checked={hideCompleted}
                        onChange={(e) => {
                            setHideCompleted(e.target.checked)
                            setCurrentPage(1);
                        }}
                    /> Скрыть выполненные задачи
                </label>
            </div>
            <ul>{listItems}</ul>
            <div className="pagination">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}>Назад</button>
                <span>
                    Страница {currentPage}
                </span>
                <button
                    disabled={currentPage === Math.ceil(filteredTasks.length / tasksPerPage)}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Вперёд
                </button>
            </div>
        </div>
    );
}
export default FamilyTaskList;
