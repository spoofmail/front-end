import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@mui/material";
import Brightness6Icon from '@mui/icons-material/Brightness6';

import useDarkMode from "../hooks/useDarkMode"

import "../CSS/Nav.css"

import RefreshToggle from "./RefreshToggle";

let themeData = {
    "true": {
        "--primary-color": "#2a2a2e",
        "--background-color": "#38383d",
        "--background-color-trans": "#38383dcc",
        "--button-color": "#3f51b5",
        "--button-hover-color": "#303f9f",
        "--input-color": "white",
        "--font-color": "white",
        "--font-color2": "black",
    },
    "false": {
        "--primary-color": "white",
        "--background-color": "#eee",
        "--background-color-trans": "#eeeeeec2",
        "--button-color": "#3f51b5",
        "--button-hover-color": "#303f9f",
        "--input-color": "black",
        "--font-color": "black",
        "--font-color2": "white",
    }
}

export default props => {
    const [darkMode, setDarkMode] = useDarkMode();
    const navigate = useNavigate()

    useEffect(() => {
        Object.keys(themeData[darkMode + ""]).forEach(key => {
            document.documentElement.style.setProperty(key, themeData[darkMode + ""][key]);
        })
    }, [darkMode])

    const handleLogOut = _ => {
        localStorage.removeItem("user_token");
        navigate('/login', { replace: true })
    }

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className="navigation">
            { props.isLogin ? (
                <Link to="/">Home</Link>
            ) : (
                <Link to = "/dashboard" style = {{ visibility: "hidden" }}></Link>
            ) }
            <div style = {{ display: "flex", alignItems: "center" }}>
                <RefreshToggle />
                <Brightness6Icon htmlColor={"var(--font-color)"} onClick = {handleDarkMode} sx={{ marginRight: '10px', cursor: 'pointer' }} />
                { !props.isLogin && <Button variant = "contained" color = "primary" onClick = {handleLogOut} style = {{ margin: 0 }}>Sign out</Button> }
            </div>
        </div>
    );
}