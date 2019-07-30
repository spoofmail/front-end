import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core";
import { Opacity } from "@material-ui/icons";

import useDarkMode from "../hooks/useDarkMode"

import "../CSS/Nav.css"

import history from "../history"
import Cookies from "universal-cookie";
let cookies = new Cookies();

let themeData = {
    "true": {
        "--primary-color": "#2a2a2e",
        "--background-color": "#38383d",
        "--button-color": "#3f51b5",
        "--button-hover-color": "#303f9f",
        "--input-color": "white",
        "--font-color": "white",
        "--font-color2": "black",
    },
    "false": {
        "--primary-color": "white",
        "--background-color": "#eee",
        "--button-color": "#3f51b5",
        "--button-hover-color": "#303f9f",
        "--input-color": "black",
        "--font-color": "black",
        "--font-color2": "white",
    }
}

export default props => {
    const [darkMode, setDarkMode] = useDarkMode();

    useEffect(_ => {
        Object.keys(themeData[darkMode + ""]).forEach(key => {
            document.documentElement.style.setProperty(key, themeData[darkMode + ""][key]);
        })
    }, [darkMode])

    const handleLogOut = _ => {
        cookies.remove("token");
        history.push("/login");
    }

    const _renderHomeButton = _ => {
        if (props.isLogin) return <Link to="/">Home</Link>;
        else return (
            <Link to = "/dashboard" style = {{ visibility: "hidden" }}></Link>
        );
    }

    const handleDarkMode = _ => {
        setDarkMode(!darkMode);
    }

    const _renderRight = _ => {
        return (
            <div style = {{ display: "flex", alignItems: "center" }}>
                <Opacity className = "opacity-style" onClick = {handleDarkMode} />
                <Button variant = "contained" color = "primary" onClick = {handleLogOut} style = {{ display: props.isLogin ? "none" : "block"}}>Sign out</Button>
            </div>
        );
    }

    return (
        <div className="navigation">
            {_renderHomeButton()}
            <h3 className = {props.isLogin ? "" : "active"}>SpoofMail</h3>
            {_renderRight()}
        </div>
    );
}