import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import EmailList from './EmailList';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import AnimateHeight from 'react-animate-height';

import Cookies from "universal-cookie";

import "../../../CSS/github.css"

let cookies = new Cookies();

const style = { color: "var(--font-color)", fontSize: "2rem", cursor: "pointer" }

const Address = ({ data, id, removeAddress }) => {
    const [expanded, setExpanded] = useState(false);

    const [nameEdit, setNameEdit] = useState(data.addresstag);
    const [editMode, setEditMode] = useState(false);

    const _renderChevron = () => {
        if (!expanded) return <KeyboardArrowDown style={style} onClick={_ => setExpanded(true)} />
        else return <KeyboardArrowUp style={style} onClick={_ => setExpanded(false)} />
    }

    const _renderName = () => {
        if (editMode) return <form onSubmit={handleEditBlur}><TextField variant="filled" value={nameEdit} onChange={handleNameEdit}  /></form>;
        else return <h3 onClick={_ => setEditMode(true)}>{nameEdit}</h3>;
    }

    const handleEditBlur = e => {
        e.preventDefault();
        setEditMode(false);

        if(nameEdit !== data.addresstag)
        // @ts-ignore
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

    const _renderEmail = () => (
        <div className="BtnGroup">
            <h3 className="address text-mono f6 btn btn-outline BtnGroup-item">
                {data.addressname}
            </h3>
            { /* @ts-ignore */ }
            <clipboard-copy value="02d6c266d93c4ff92ca5a8aa2d7b922e067c43de" aria-label="Copy the full SHA" className="btn btn-outline BtnGroup-item" tabindex="0" role="button" onClick={handleHoverClick}>
                <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" className="octicon octicon-clippy">
                    <path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path>
                </svg>
            { /* @ts-ignore */ }    
            </clipboard-copy>

        </div>
    )

    const handleHoverClick = () => {
        navigator.clipboard.writeText(data.addressname);
    }

    const onRemove = () => {
        // @ts-ignore
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
                <div>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditOutlinedIcon />}
                        style={{ marginRight: 15 }}
                        onClick={() => setEditMode(true)}
                    >
                        Edit
                    </Button>
                    <Button variant="outlined" style={{ color: "red", borderColor: "red", textTransform: "none" }} onClick = {onRemove}>Remove</Button>
                </div>
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