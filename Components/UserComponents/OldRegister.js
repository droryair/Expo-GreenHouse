import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function OldRegister() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fullName, setFullName] = useState();
    const [cityName, setCityName] = useState();
    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const newUser = { fullName, email, password, cityName };
            await Axios.post("http://localhost:3001/register", newUser);
            const loginRes = await Axios.post("http://localhost:3001/login", {
                email,
                password,
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="page">
            <h2>Register</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input
                    id="register-email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Password</label>
                <input
                    id="register-password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="register-full-name">Full name</label>
                <input
                    id="register-full-name"
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor="register-city-name">City</label>
                <input
                    id="register-city-name"
                    type="text"
                    onChange={(e) => setCityName(e.target.value)}
                />

                <input type="submit" value="Register" />
            </form>
        </div>
    );
}
