import React from "react";

const FormLogin = () => {
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const onChangeUser = (e) => {
        setUser(e.target.value);
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    return (
        <form action="">
            <p>User: {user}</p>
            <p>Password: {password}</p>
            <div>
                <label htmlFor="user">User:</label>
                <input
                    type="text" 
                    ame="user"
                    id="user"
                    onChange={onChangeUser}/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={onChangePassword}/>
            </div>
            <button type="submit">Login</button>
        </form>
    );
}
 
export default FormLogin;