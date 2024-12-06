import { useState } from "react";
import './Login.css';
import './Login_adapt.css';

function Login({ handleLoginSuccess }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const BASE_USERS_URL = "https://6750ad6069dc1669ec1bf88c.mockapi.io/users";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(BASE_USERS_URL);
            const users = await response.json();

            const user = users.find((u)=> u.username === username && u.password ===password);

            if (user){
                handleLoginSuccess(username);
            } else{
                setError ('Неверный логин или пароль');
            }

        } catch (error) {
            console.error ("Ошибка при логине", error);
            setError ("Ошибка сервера, попробуйте позже");
        }
 
    };

    return (
        <div className="loginContainer">

            <form className="loginForm" onSubmit={handleSubmit}>
                <h2>Менеджер задач семьи</h2>
                <div>
                    <label>Имя пользователя</label>
                    <input
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Имя'
                    />
                </div>
                <div className="loginGroup">
                    <label>Пароль</label>
                    <input
                        className="loginInput"
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Пароль'
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type='submit'>Войти</button>
            </form>
        </div>
    )

}

export default Login;