import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Paper, InputBase, IconButton, TextField } from "@material-ui/core";
import { Search, Cancel, KeyboardArrowDown, KeyboardArrowUp, Trash } from "@material-ui/icons"

import { faTrashAlt, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EmailStore from "../../stores/email-store";

import ReactModal from "react-modal";


import SearchHeader from './dashboardComponents/SearchHeader';

import sanitizeHTML from "sanitize-html"
import { Parser } from "html-to-react";

import {addressesList, emailData} from './DummyData';

import "../../CSS/Dashboard.css"
import {customStyles} from './customStyles';

const htmlToReact = new Parser();

ReactModal.setAppElement('#root')

const fakeFetchAddress = _ => {
    return new Promise(function(resolve, reject) {
        setTimeout(_ => resolve(addressesList), 100);
    })
}

const fakeFetchEmails = id => {
    return new Promise(function(resolve, reject) {
        setTimeout(_ => resolve(emailData.filter(e => e.address_id === id)), 100);
    })
}
// ----- devide up 

export default _ => {
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState({});
    const [emailCount, setEmailCount] = useState(0);

    const [emailVisible, setEmailVisible] = useState(false);
    const [emailData, setEmailData] = useState({});

    console.log(emailVisible, emailData);

    const setEmailVisi = value => {
        setEmailVisible(value);
    }

    const setEmailContent = data => {
        setEmailData(data);
    }

    useEffect(_ => {
        document.title = "Dashboard";
        fakeFetchAddress().then(data => {
            let promiseArr = []
            data.forEach(address => {
                promiseArr.push(fakeFetchEmails(address.id))
            })

            Promise.all(promiseArr).then(data2 => {
                let amount = 0;
                let newEmailObj = {};
                
                data2.forEach(e => {
                    let id = e[0].address_id;
                    newEmailObj[id] = e;
                    amount += e.length;
                })

                setAddresses(data);
                setEmails(newEmailObj);
                setEmailCount(amount);
            })
        })
    }, [])
// Im guessing the email store has already been built out, but the .js is one line long so I wanted to ask
    return (
        <EmailStore.Provider value = {{ openEmail: _ => setEmailVisi(true), 
                                        closeEmail: _ => setEmailVisi(false),
                                        setEmailContent }}>
            <div className="dash-container">
                <div className="title">
                    <h1>Your Inbox - ({emailCount})</h1>
                    
                </div>
                <div className="emails">
                    <SearchHeader  />
                    <AddressList addresses = {addresses} emails = {emails}/>
                </div>
                <ReactModal
                    isOpen = {emailVisible}
                    onRequestClose = {_ => setEmailVisi(false)}
                    style = {customStyles}
                    contentLabel = {"Email"}
                >
                    <ViewEmail data = {emailData} />
                </ReactModal>
            </div>
        </EmailStore.Provider>
    );
}

const ViewEmail = ({ data }) => {

    let sanitized = sanitizeHTML(data.html, {
        allowedTags: sanitizeHTML.defaults.allowedTags.concat([ "img", "h1", "h2" ]),
        allowedAttributes: { "*": ['style'] }
    })

    return (
            <div className = "email-view">
                <div className = "title">
                    <h1>From: {data.from}</h1>
                    <h1>Subject: {data.subject}</h1>
                </div>
                <div className = "email-port">
                    { htmlToReact.parse(sanitized) }
                </div>
            </div>
    );
}


const AddressList = props => {

    return (
        <div className="body">
            { 
                props.addresses.length === 0 ? 
                <h1>Loading Addresses...</h1> : 
                props.addresses.map((e, i) => <Address key = {i} data = {e} emails = {props.emails[e.id]}/>)
            }
        </div>
    );
}

const style = { color: "var(--font-color)", fontSize: "2rem", cursor: "pointer" }

const Address = ({ data, emails }) => {
    const context = useContext(EmailStore);

    const [expanded, setExpanded] = useState(false);

    const [nameEdit, setNameEdit] = useState(data.name);
    const [editMode, setEditMode] = useState(false);

    const [hoverMode, setHoverMode] = useState(false);

    const _renderChevron = _ => {
        if(!expanded) return <KeyboardArrowDown style = {style} onClick = {_ => setExpanded(true)}/>
        else return <KeyboardArrowUp style = {style} onClick = {_ => setExpanded(false)}/>
    }

    const _renderName = _ => {
        if(editMode) return <form onSubmit = {handleEditBlur}><TextField value = {nameEdit} onChange = {handleNameEdit} onBlur = {handleEditBlur} /></form>;
        else return <h3 onClick = {_ => setEditMode(true)}>{nameEdit}</h3>;
    }

    const handleEditBlur = e => {
        e.preventDefault();
        setEditMode(false);
    }

    const handleNameEdit = e => {
        setNameEdit(e.target.value);
    }

    const _renderEmail = _ => {
        if(hoverMode) return <h3 onMouseLeave = {handleMouseLeave} style = {{ cursor: "pointer", border: "1px solid var(--font-color)", padding: 5 }} onClick = {handleHoverClick}>{data.email} <FontAwesomeIcon icon = {faCopy} /></h3>;
        else return <h3 onMouseOver = {handleMouseOver} >{data.email}</h3>;
    }

    const handleMouseOver = _ => {
        setHoverMode(true);
    }

    const handleMouseLeave = _ => {
        setHoverMode(false);
    }

    const handleHoverClick = _ => {
        navigator.clipboard.writeText(data.email);
        alert("Copied to clipboard");
    }

    return (
        <div className = "address">
            <div className = "title">
                <div>
                    { _renderChevron() }
                    { _renderName() }
                    { _renderEmail() }
                    <h3>{data.emails}</h3>
                </div>
                <Button variant = "outlined" style = {{ color: "red", borderColor: "red", textTransform: "none" }}>Remove</Button>
            </div>
            <div className = "email-list" style = {{ display: expanded ? "flex" : "none" }}>
                <EmailList emails = {emails} context = {context}/>
            </div>
        </div>
    );
}



const EmailList = props => {
    if(!props.emails) return <></>;
    return props.emails.map((e, i) => <Email key = {i} data = {e} context = {props.context}/>)
}

const clickEmail = (data, context) => {
    context.setEmailContent(data);
    context.openEmail();
}

const Email = ({ data, context }) => {
    return (
        <div className = "email" onClick = {_ => clickEmail(data, context)}>
            <div>
                <h3>From: {data.from}</h3>
                <h3>Subject: {data.subject}</h3>
            </div>
            <FontAwesomeIcon icon = {faTrashAlt} style = {{ color: "red", cursor: "pointer" }} />
        </div>
    );
}
