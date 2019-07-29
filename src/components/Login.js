import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { TextField, Input, Button } from "@material-ui/core";

import history from "../history";

import "../CSS/Login.css"

export default props => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

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

                    {isLogin ? <LoginComponent setError={setError} /> : <SignupComponent setError={setError} />}
                    <h4 style={{ display: error === "" ? "none" : "block" }}>{error}</h4>
                </div>
            </div>
        </>
    );
}

const LoginComponent = props => {
    const [code, setCode] = useState("");
    const [requested, setRequested] = useState(false);

    useEffect(_ => {
        document.title = "Login"
    }, [])

    const handleChange = e => {
        const { name, value } = e.target; // Future expandability for username
        setCode(value);
    }

    const handleSuccess = data => {

    }

    const handleError = err => {
        console.log(err);
        setRequested(false);
        props.setError(err);
    }

    const handleSubmit = e => {
        e.preventDefault();
        history.push("/dashboard");
        /*e.preventDefault();

        setRequested(true);

        fetch(`${window.serverURL}/`, {
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
            <TextField label="Token" variant = "outlined" type = "password">
                <Input value={code} onChange={handleChange} type = "password" />
            </TextField>
            <Button variant="outlined" color="primary" type = "submit">
                {requested ? "Checking..." : "Log in"}
            </Button>
        </form>
    );
}

const SignupComponent = props => {
    const [requested, setRequested] = useState(false);

    useEffect(_ => {
        document.title = "Signup";
    }, [])

    const handleSuccess = data => {

    }

    const handleError = err => {
        console.log(err);
        setRequested(false);
        props.setError(err);
    }

    const handleSubmit = e => {
        e.preventDefault();

        setRequested(true);

        fetch(`${window.serverURL}/`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(handleSuccess)
            .catch(handleError)
    }

    return (
        <form onSubmit={handleSubmit}>
            <Button variant="outlined" color="primary" type = "submit">
                {requested ? "Checking..." : "Generate New Account"}
            </Button>
        </form>
    );
}