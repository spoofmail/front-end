import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Paper, InputBase, IconButton, TextField } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp, Trash } from "@material-ui/icons";
import EmailList from './EmailList';
import EmailStore from "../../../stores/email-store";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCopy } from "@fortawesome/free-solid-svg-icons";

import AnimateHeight from 'react-animate-height';

import Cookies from "universal-cookie";
let cookies = new Cookies();

const style = { color: "var(--font-color)", fontSize: "2rem", cursor: "pointer" }

const Address = ({ data, emails, id, removeAddress }) => {
    const [expanded, setExpanded] = useState(false);

    const [nameEdit, setNameEdit] = useState(data.addresstag);
    const [editMode, setEditMode] = useState(false);

    const [hoverMode, setHoverMode] = useState(false);

    const _renderChevron = _ => {
        if (!expanded) return <KeyboardArrowDown style={style} onClick={_ => setExpanded(true)} />
        else return <KeyboardArrowUp style={style} onClick={_ => setExpanded(false)} />
    }

    const _renderName = _ => {
        if (editMode) return <form onSubmit={handleEditBlur}><TextField value={nameEdit} onChange={handleNameEdit}  /></form>;
        else return <h3 onClick={_ => setEditMode(true)}>{nameEdit}</h3>;
    }

    const handleEditBlur = e => {
        e.preventDefault();
        setEditMode(false);

        if(nameEdit !== data.addresstag)
            fetch(`${window.serverURL}/api/addresses/${id}`, {
                headers: {
                    'Authorization': cookies.get("token"),
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                method: "PUT",
                body: JSON.stringify({ addresstag: nameEdit })
            }).then(res => res.json()).then(data => {

            })
    }

    const handleNameEdit = e => {
        setNameEdit(e.target.value);
    }

    const _renderEmail = _ => {
        if (hoverMode) return <h3 onMouseLeave={handleMouseLeave} style={{ cursor: "pointer", border: "1px solid var(--font-color)", padding: 5 }} onClick={handleHoverClick}>{data.addressname} <FontAwesomeIcon icon={faCopy} /></h3>;
        else return <h3 onMouseOver={handleMouseOver} >{data.addressname}</h3>;
    }

    const handleMouseOver = _ => {
        setHoverMode(true);
    }

    const handleMouseLeave = _ => {
        setHoverMode(false);
    }

    const handleHoverClick = _ => {
        navigator.clipboard.writeText(data.addressname);
    }

    const onRemove = _ => {
        fetch(`${window.serverURL}/api/addresses/${id}`, {
            headers: {
                'Authorization': cookies.get("token"),
            },
            method: "DELETE"
        }).then(res => res.json()).then(data => {
            removeAddress(id)
        })
    }

    return (
        <div className="address">
            <div className="title" onMouseLeave={handleEditBlur}>
                <div>
                    {_renderChevron()}
                    {_renderName()}
                    {_renderEmail()}
                </div>
                <Button variant="outlined" style={{ color: "red", borderColor: "red", textTransform: "none" }} onClick = {onRemove}>Remove</Button>
            </div>
            <div className={`email-list ${expanded ? "open" : ""}`}>
                <AnimateHeight height = {expanded ? "auto" : 0 } duration = {500}>
                    <EmailList id = {id}/>
                </AnimateHeight>
            </div>
        </div>
    );
}

export default Address;