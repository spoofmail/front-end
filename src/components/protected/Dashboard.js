import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Paper, InputBase, IconButton, TextField } from "@material-ui/core";
import { Search, Cancel, KeyboardArrowDown, KeyboardArrowUp, Trash } from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';

import { faTrashAlt, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import EmailStore from "../../stores/email-store";

import ReactModal from "react-modal";

import sanitizeHTML from "sanitize-html"
import { Parser } from "html-to-react";

import "../../CSS/Dashboard.css"
import Cookies from "universal-cookie";

let cookies = new Cookies();

const htmlToReact = new Parser();

ReactModal.setAppElement('#root')

const addressesList = [
    { id: 0, user_id: 0, name: "Google", email: `${generateRandomName(16)}@gmail.com` },
    { id: 1, user_id: 1, name: "Twitter", email: `${generateRandomName(16)}@gmail.com` },
]

const emailData = [
    { address_id: 0, from: "google@gmail.com", subject: "Verify Email", html: `<div><p style="color:red;">Hello</p></div>` },
    { address_id: 1, from: "tim@gmail.com", subject: "Not " },
    { address_id: 1, from: "tim@twitter.com", subject: "Hello2 " },
    { address_id: 1, from: "john@google.com", subject: "Hello3 " },
]

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor: "var(--primary-color)"
    },
    overlay: {
        backgroundColor: "var(--background-color-trans)"
    }
  };

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
      },
      resize: {
          fontSize: "2rem"
      },
      root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      },
      input: {
        marginLeft: 8,
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        width: 1,
        height: 28,
        margin: 4,
      },
  }));

const fetchAdresses = _ => {
    return new Promise(function(resolve, reject) {
        fetch(`${window.serverURL}/api/addresses`, {
            headers: {
                'Authorization': cookies.get("token")
            }
        }).then(res => res.json()).then(data => {
            resolve(data);
        })
    })
}

const fetchEmails = id => {
    return new Promise(function(resolve, reject) {
        fetch(`${window.serverURL}/api/messages/${id}`, {
            headers: {
                'Authorization': cookies.get("token")
            }
        }).then(res => res.json()).then(data => {
            resolve(data);
        })
    })
}

let interval = null;

export default _ => {
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState({});
    const [emailCount, setEmailCount] = useState(0);

    const [emailVisible, setEmailVisible] = useState(false);
    const [emailData, setEmailData] = useState({});

    const setEmailVisi = value => {
        setEmailVisible(value);
    }

    const setEmailContent = data => {
        setEmailData(data);
    }

    useEffect(_ => {
        document.title = "Dashboard";

        clearInterval(interval);
        interval = null;

        const setAddresseses = _ => {
            fetchAdresses().then(data => {
                let promiseArr = []
                data.forEach(address => {
                    promiseArr.push(fetchEmails(address.id))
                })
    
                Promise.all(promiseArr).then(data2 => {
                    let amount = 0;
                    let newEmailObj = {};
                    
                    if(!data2 || data2.length === 0) {
                        setAddresses(data);
                    }
                    else {
                        console.log(data2)
                        data2.forEach(e => {
                            if(!e || e.length === 0) {
    
                            }
                            else {
                                let id = e[0].address_id;
                                console.log(id)
                                newEmailObj[id] = e;
                                amount += e.length;
                            }
                        })
                        
                        if(data.length !== addresses.length)
                            setAddresses(data);
                        setEmails(newEmailObj);
                        setEmailCount(amount);
                    }
                    
                })
            })
        }

        interval = setInterval(setAddresseses, 5000);
        setAddresseses();

        return _ => {
            clearInterval(interval);
        }
        
    }, [])

    return (
        <EmailStore.Provider value = {{ openEmail: _ => setEmailVisi(true), 
                                        closeEmail: _ => setEmailVisi(false),
                                        setEmailContent }}>
            <div className="dash-container">
                <div className="title">
                    <h1>Your Inbox - ({emailCount})</h1>
                    
                </div>
                <div className="emails">
                    <SearchHeader />
                    <AddressList addresses = {addresses} emails = {emails} />
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
        allowedTags: sanitizeHTML.defaults.allowedTags.concat([ "img", "h1", "h2", "a" ]),
        allowedAttributes: { "*": ['style', "href"] }
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

const SearchHeader = props => {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [form, setForm] = useState({
        name: ""
    });
    const [generateVisi, setGenerateVisi] = useState(false);

    const handleChange = e => {
        setSearch(e.currentTarget.value)
    }

    const resetSearch = _ => {
        setSearch("")
    }

    const handleNameChange = e => {
        let { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleAddressSubmit = e => {
        e.preventDefault();

        fetch(`${window.serverURL}/api/addresses`, {
            headers: {
                'Authorization': cookies.get("token"),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({ addresstag: form.name })
        }).then(res => res.json()).then(data => {
            console.log(data);
        })
    }

    return (
        <>
            <div className="header">
                <Paper>
                    <IconButton disableFocusRipple disableTouchRipple>
                        <Search />
                    </IconButton>
                    <InputBase 
                        variant = "outlined" 
                        className={classes.textField} 
                        value={search} 
                        onChange={handleChange} 
                        placeholder = "Search"
                    />
                    <IconButton disableFocusRipple disableTouchRipple onClick = {resetSearch}>
                        <Cancel />
                    </IconButton>
                </Paper>
                <div>
                    
                </div>
                <Button variant="contained" color="primary" style={{ width: 250 }} onClick = {_ => setGenerateVisi(true)}>Generate Email</Button>
            </div>
            <ReactModal
                    isOpen = {generateVisi}
                    onRequestClose = {_ => setGenerateVisi(false)}
                    style = {customStyles}
                    contentLabel = {"Generate Address"}
                >
                <form onSubmit = {handleAddressSubmit}>
                    <TextField name = "name" value = {form.name} onChange = {handleNameChange}  />
                    <Button variant = "contained" color = "primary" type = "submit">Generate</Button>
                </form>
            </ReactModal>
        </>
    );
    
}

const AddressList = props => {
    

    let reverser = Array.from(props.addresses).reverse();

    return (
        <div className="body">
            { 
                props.addresses.length === 0 ? 
                <h1>Loading Addresses...</h1> : 
                reverser.map((e, i) => <Address key = {i} data = {e} emails = {props.emails[e.id]}/>)
            }
        </div>
    );
}

const style = { color: "var(--font-color)", fontSize: "2rem", cursor: "pointer" }

const Address = ({ data, emails }) => {
    const context = useContext(EmailStore);

    const [expanded, setExpanded] = useState(false);

    const [nameEdit, setNameEdit] = useState(data.addresstag);
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
        if(hoverMode) return <h3 onMouseLeave = {handleMouseLeave} style = {{ cursor: "pointer", border: "1px solid var(--font-color)", padding: 5 }} onClick = {handleHoverClick}>{data.addressname} <FontAwesomeIcon icon = {faCopy} /></h3>;
        else return <h3 onMouseOver = {handleMouseOver} >{data.addressname}</h3>;
    }

    const handleMouseOver = _ => {
        setHoverMode(true);
    }

    const handleMouseLeave = _ => {
        setHoverMode(false);
    }

    const handleHoverClick = _ => {
        navigator.clipboard.writeText(data.addressname);
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
    const [emails, setEmails] = useState(props.emails);
    const [emailInterval, setEmailInterval] = useState(null);

    useEffect(_ => {
        clearInterval(emailInterval);

        setEmailInterval(setInterval(_ => {
            let id = emails[0].address_id;

            fetchEmails(id).then(data => {
                console.log("called");
                if(data.length !== emails.length) {
                    //setEmails(data);
                    console.log("difference");
                }
            })
        }, 5000))

        return _ => {
            clearInterval(emailInterval);
        }
    }, [])


    if(!emails) return <></>;
    else {

        let reversed = Array.from(props.emails).reverse();

        if(emails.length !== 0)
            return (
                reversed.map((e, i) => <Email key = {i} data = {e} context = {props.context}/>)
            )
        else return <h1>No Emails here</h1>
    }
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

function generateRandomName(length) {
    let a = "abcdefghijklmnopqrstuvwxyz"

    let name = ""

    for (let i = 0; i < length; i++) {
        name += a.charAt(Math.random() * a.length);
    }

    return name;
}