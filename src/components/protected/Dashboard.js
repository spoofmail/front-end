import React, { useState, useEffect } from "react";
import { Button, Paper, InputBase, IconButton } from "@material-ui/core";
import { Search, Cancel, KeyboardArrowDown, KeyboardArrowUp, Trash } from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';

import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/*import { Parser } from "html-to-react";
const externalize = new Parser();
{ externalize.parse(data.html) }*/

import "../../CSS/Dashboard.css"

const addressesList = [
    { id: 0, name: "Google", email: `${generateRandomName(16)}@gmail.com`, emails: 24 },
    { id: 1, name: "Twitter", email: `${generateRandomName(16)}@gmail.com`, emails: 12 },
]

const emailData = [
    { address_id: 0, from: "google@gmail.com", subject: "Verify Email" },
    { address_id: 1, from: "tim@gmail.com", subject: "Not " },
    { address_id: 1, from: "tim@twitter.com", subject: "Hello2 " },
    { address_id: 1, from: "john@google.com", subject: "Hello3 " },
]

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

export default _ => {
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState({});
    const [emailCount, setEmailCount] = useState(0);

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

    return (
        <div className="dash-container">
            <div className="title">
                <h1>Your Inbox - ({emailCount})</h1>
                
            </div>
            <div className="emails">
                <SearchHeader />
                <AddressList addresses = {addresses} emails = {emails}/>
            </div>
        </div>
    );
}

const SearchHeader = props => {
    const classes = useStyles();

    const [search, setSearch] = useState("");

    const handleChange = e => {
        setSearch(e.currentTarget.value)
    }

    const resetSearch = _ => {
        setSearch("")
    }

    return (
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
            <Button variant="contained" color="primary" style={{ width: 250 }}>Generate Email</Button>
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
    const [expanded, setExpanded] = useState(false);

    const _renderChevron = _ => {
        if(!expanded) return <KeyboardArrowDown style = {style} onClick = {_ => setExpanded(true)}/>
        else return <KeyboardArrowUp style = {style} onClick = {_ => setExpanded(false)}/>
    }

    return (
        <div className = "address">
            <div className = "title">
                <div>
                    { _renderChevron() }
                    <h3>{data.name}</h3>
                    <h3>{data.email}</h3>
                    <h3>{data.emails}</h3>
                </div>
                <Button variant = "outlined" style = {{ color: "red", borderColor: "red", textTransform: "none" }}>Remove</Button>
            </div>
            <div className = "email-list" style = {{ display: expanded ? "flex" : "none" }}>
                <EmailList emails = {emails}/>
            </div>
        </div>
    );
}



const EmailList = props => {
    if(!props.emails) return <></>;
    return props.emails.map((e, i) => <Email key = {i} data = {e} />)
}

const Email = ({ data }) => {
    return (
        <div className = "email">
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