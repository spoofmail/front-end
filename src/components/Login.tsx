import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { TextField, Button } from "@mui/material";

import "../CSS/Login.css"

import { SpoofmailAPI } from "../App";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { useLocation, useNavigate } from "react-router";

export default () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <Nav isLogin />
            <div className="login-container">
                <img src = "./spoof-mail-logo.jpg"></img>
                <div className={"info " + (isLogin ? "isLogin" : "isSignup")}>
                    <div className="login-choice">
                        <div className={isLogin ? "active" : ""} onClick={_ => setIsLogin(true)}>Login</div>
                        <div className={!isLogin ? "active" : ""} onClick={_ => setIsLogin(false)}>Signup</div>
                    </div>

                    {isLogin ? <LoginComponent /> : <SignupComponent />}
                </div>
            </div>
        </>
    );
}

const LoginComponent = props => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // @ts-ignore
    const from = location.state?.from?.pathname || "/emails"

    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(false);
    const [requested, setRequested] = useState(false);

    useEffect(() => {
        document.title = "Login"
    }, [])

    const handleChange = e => {
        const { name, value } = e.target; // Future expandability for username
        setForm({ ...form, [name]: value });
    }

    const handleSuccess = res => {
        console.log(res)
        setRequested(false);
        if(res.status !== 200) {
            setError(true);
        }
        else {
            dispatch(setUser(res.data.user))
            localStorage.setItem('user_token', res.data.token)
            navigate(from, { replace: true })
        }
    }

    const handleError = err => {
        console.log(err);
        setRequested(false);
        setError(true)
    }

    const handleSubmit = e => {
        e.preventDefault();
        setRequested(true);
        setError(false);

        console.log({ username: form.username, password: form.password })

        SpoofmailAPI.login({ username: form.username, password: form.password })
            .then(handleSuccess)
            .catch(handleError)
    }

    return (
        <>
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

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                {requested ? "Checking..." : "Log in"}
            </Button>
        </>
    );
}

const SignupComponent = props => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    // @ts-ignore
    const from = location.state?.from?.pathname || "/emails"
    
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

    useEffect(() => {
        document.title = "Signup";
    }, [])

    const handleChange = e => {
        let { name, value } = e.target;

        value = value.trim();

        setForm({ ...form, [name]: value });
    }

    const handleSuccess = res => {
        setRequested(false);
        if(res.status !== 201 && res.status !== 200) {
            setError({
                ...formError,
                username: "Username taken"
            });
        }
        else {
            dispatch(setUser(res.data.user))
            localStorage.setItem('user_token', res.data.token)
            navigate(from, { replace: true })
        }
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

        if(form.password !== form.confirmPassword) {
            newErrors = {
                ...newErrors,
                password: "Passwords dont match",
                confirmPassword: "Passwords dont match"
            }
            setError(newErrors);
            return;
        }

        SpoofmailAPI.register({ username: form.username, password: form.password })
            .then(handleSuccess)
            .catch(handleError)
    }

    return (
        <>
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

            <Button variant="contained" color="primary" onClick={handleSubmit}>
                {requested ? "Creating account..." : "Create Account"}
            </Button>
        </>
    );
}