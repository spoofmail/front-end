import React, { useState } from "react";
import { Link } from "react-router-dom"

import { Button } from "@material-ui/core";
import { Menu, DragHandle } from "@material-ui/icons"
import history from "../history"

import "../CSS/Nav.css"

export default props => {
    const [renderMenu, setRenderMenu] = useState(false);

    const handleToggle = _ => {
        setRenderMenu(!renderMenu);
    }

    const handleLogOut = _ => {
        history.push("/login");
    }

    const _renderHomeButton = _ => {
        if (props.isLogin) return <Link to="/">Home</Link>;
        else return (
            <Link to = "/dashboard" style = {{ visibility: "hidden" }}>Home</Link>
        );
    }

    const _renderSignOut = _ => {
        if (props.isLogin) return <></>;
        else return (
            <Button variant = "outlined" color = "primary" onClick = {handleLogOut}>Sign out</Button>
        );
    }

    return (
        <div className="navigation">
            {_renderHomeButton()}
            <h3 className = {props.isLogin ? "" : "active"}>SpoofMail</h3>
            {_renderSignOut()}
        </div>
    );
}