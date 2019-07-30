import React, { useState, useEffect } from "react";
import { Button, Paper, InputBase, IconButton } from "@material-ui/core";
import { Search, Cancel, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';

/*import { Parser } from "html-to-react";
const externalize = new Parser();
{ externalize.parse(data.html) }*/

import "../../CSS/Dashboard.css"

const addressesList = [
    { name: "Google", email: `${generateRandomName(16)}@gmail.com`, emails: 24 }
]

const emailData = [
    { from: "google@gmail.com", subject: "Verify Email" }
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

export default _ => {
    const [addresses, setAddresses] = useState([]);

    useEffect(_ => {
        document.title = "Dashboard";
        setTimeout(_ => setAddresses(addressesList), 1000)
    }, [])

    return (
        <div className="dash-container">
            <div className="title">
                <h1>Your Inbox - ({"50"})</h1>
                
            </div>
            <div className="emails">
                <SearchHeader />
                <AddressList addresses = {addresses}/>
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
            { props.addresses.length === 0 ? <h1>Loading Addresses...</h1> : props.addresses.map((e, i) => <Address key = {i} data = {e} />)}
        </div>
    );
}

const style = { color: "var(--font-color)", fontSize: "2rem", cursor: "pointer" }

const Address = ({ data }) => {
    const [expanded, setExpanded] = useState(false);

    const _renderChevron = _ => {
        if(!expanded) return <KeyboardArrowDown style = {style} onClick = {_ => setExpanded(true)}/>
        else return <KeyboardArrowUp style = {style} onClick = {_ => setExpanded(false)}/>
    }

    return (
        <div className = "address">
            <div className = "title">
                { _renderChevron() }
                <h3>{data.name}</h3>
                <h3>{data.email}</h3>
                <h3>{data.emails}</h3>
            </div>
            <div className = "email-list" style = {{ display: expanded ? "flex" : "none" }}>
                <EmailList />
            </div>
        </div>
    );
}



const EmailList = props => {
    const [emails, setEmails] = useState([]);

    useEffect(_ => {
        setTimeout(_ => setEmails(emailData), 1000);
    }, [])

    return emails.map((e, i) => <Email key = {i} data = {e} />)
}

const Email = ({ data }) => {
    return (
        <div className = "email">
            <h3>From: {data.from}</h3>
            <h3>Subject: {data.subject}</h3>
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