import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { TextField, Input, Button } from "@material-ui/core";

import history from "../history";

import "../CSS/Login.css"

export default _ => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Nav isLogin />
            <div className="login-container">
                <h1>SpoofMail</h1>
                <div className={"info " + (isLogin ? "isLogin" : "isSignup")}>
                    <div className="login-choice">
                        <div className={isLogin ? "active" : ""} onClick={_ => setIsLogin(true)} left="true">Login</div>
                        <div className={!isLogin ? "active" : ""} onClick={_ => setIsLogin(false)} left="false">Signup</div>
                    </div>

                    {isLogin ? <LoginComponent /> : <SignupComponent />}
                </div>
            </div>
        </>
    );
}

const LoginComponent = props => {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [requested, setRequested] = useState(false);

    useEffect(_ => {
        document.title = "Login"
    }, [])

    const handleChange = e => {
        const { name, value } = e.target; // Future expandability for username
        setForm({ ...form, [name]: value });
    }

    // eslint-disable-next-line
    const handleSuccess = data => {

    }

    // eslint-disable-next-line
    const handleError = err => {
        console.log(err);
        setRequested(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        setRequested(true);
        history.push("/dashboard");

        /*fetch(`${window.serverURL}/`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ code })
        })
        .then(res => res.json())
        .then(handleSuccess)
        .catch(handleError)*/
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                label="Username" 
                variant = "outlined" 
                value={form.username} 
                onChange={handleChange} 
                type = "text" 
                name = "username" 
            />
            <TextField 
                label="Password" 
                variant = "outlined" 
                value={form.password} 
                onChange={handleChange} 
                type = "password" 
                name = "password" 
            />

            <p style = {{ color: "red" }}>{error ? "Username or password incorrect" : ""}</p>

            <Button variant="outlined" color="primary" type = "submit">
                {requested ? "Checking..." : "Log in"}
            </Button>
        </form>
    );
}

const SignupComponent = props => {
    const [form, setForm] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })
    const [formError, setError] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    })
    const [requested, setRequested] = useState(false);

    useEffect(_ => {
        document.title = "Signup";
    }, [])

    const handleChange = e => {
        let { name, value } = e.target; // Future expandability for username

        value = value.trim();

        setForm({ ...form, [name]: value });
    }

    const handleSuccess = data => {

    }

    const handleError = err => {
        console.log(err);
        setRequested(false);
    }

    const handleSubmit = e => {
        e.preventDefault();
        let newErrors = {
            username: "",
            password: "",
            confirmPassword: ""
        }

        setRequested(true);

        Object.keys(form).forEach(key => {
            if(!form[key] || form[key] === "" || form[key].length === 0) {
                newErrors[key] = "Field cannot be blank";
            }
        })

        if(form['username'] !== form['confirmPassword']) {
            newErrors = {
                ...newErrors,
                password: "Passwords dont match",
                confirmPassword: "Passwords dont match"
            }
        }

        setError(newErrors);

        /*fetch(`${window.serverURL}/`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(handleSuccess)
            .catch(handleError)*/
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField 
                label="Username" 
                variant = "outlined" 
                value={form.username} 
                onChange={handleChange} 
                type = "text" 
                name = "username" 
                error = {formError.username !== ""}
                helperText = {formError.username}
            />
            <TextField 
                label="Password" 
                variant = "outlined" 
                value={form.password} 
                onChange={handleChange} 
                type = "password" 
                name = "password" 
                error = {formError.password !== ""}
                helperText = {formError.password}
            />
            <TextField 
                label="Confirm Password" 
                variant = "outlined" 
                value={form.confirmPassword} 
                onChange={handleChange} 
                type = "password" 
                name = "confirmPassword" 
                error = {formError.confirmPassword !== ""}
                helperText = {formError.confirmPassword}
            />

            <Button variant="outlined" color="primary" type = "submit">
                {requested ? "Checking..." : "Create Account"}
            </Button>
        </form>
    );
}