import React from "react";

const FormLogin = ({setSession}) => {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onChange = (e) => {
        if (e.target.name === 'user') {
            setUser(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        } 
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (user === 'admin' && password === 'admin') {
            setSession(true)
        }
        else {
            alert('Usuario o contraseña incorrectos');
        }
    }
    return (
        <form action="" onSubmit={onSubmit}>
            <p>User: {user}</p>
            <p>Password: {password}</p>
            <div>
                <label htmlFor="user">User:</label>
                <input
                    type="text" 
                    name="user"
                    id="user"
                    onChange={onChange}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={onChange}/>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
 
export default FormLogin;