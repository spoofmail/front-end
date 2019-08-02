import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Paper, InputBase, IconButton, TextField } from "@material-ui/core";
import { Search, Cancel, Trash } from "@material-ui/icons"
import Email from './Email';
import {useStyles} from '../customStyles';
import EmailStore from '../../../stores/email-store';
import ReactModal from "react-modal";
import { customStyles } from "../customStyles";

import Cookies from "universal-cookie";

let cookies = new Cookies();

const SearchHeader = props => {
    const classes = useStyles();
    const context = useContext(EmailStore);

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [form, setForm] = useState({
        name: ""
    });
    const [generateVisi, setGenerateVisi] = useState(false);

    const handleChange = e => {
        setSearch(e.currentTarget.value)
    }

    useEffect(_ => {    
        const filterEmails = _ => {
            let allEmails =[];
            Object.keys(context.getEmails()).forEach(key => {
                console.log(context.getEmails())
    
                for(let i of context.getEmails()[key] ){
                    allEmails.push(i)
                }
            })    
    
    
            allEmails = allEmails.filter(email => {
                if(email.from.toLowerCase().includes(search.toLowerCase()) || email.subject.toLowerCase().includes(search.toLowerCase()) ) {
                    return true;
    
                } else {
                    return false;
                }
            }
                )
            console.log('allEmails', allEmails);
            setFiltered(allEmails);
        }
        
        if(search && search.length !== 0 && search.length !== "") {
            filterEmails();
        }
        else {
            resetSearch();
        }
    }
    ,[search])
    
//|| email.text.includes(search)

    const resetSearch = _ => {
        setSearch("")
        setFiltered([]);
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
            setGenerateVisi(false);
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
          
            <Button variant="contained" color="primary" style={{ width: 250 }} onClick = {_ => setGenerateVisi(true)}>Generate Email</Button>
        </div>
        <div className="filteredEmails">
            {filtered.map( (result, i) => {
            return  <Email key = {i} data = {result} context = {context} />
            })}
        
        </div>
        <ReactModal
                isOpen = {generateVisi}
                onRequestClose = {_ => setGenerateVisi(false)}
                style = {customStyles}
                contentLabel = {"Generate Address"}
            >
            <h2 style = {{ color: "var(--font-color)" }}>Generate a random email</h2>
            <h4 style = {{ color: "var(--font-color)" }}>Give the email a label for easier identification</h4>
            <form onSubmit = {handleAddressSubmit} style = {{ display: "flex", alignItems: "center" }}>
                <TextField name = "name" value = {form.name} onChange = {handleNameChange} label = "Label" />
                <Button variant = "contained" color = "primary" type = "submit" style = {{ marginLeft: 10 }}>Generate</Button>
            </form>
        </ReactModal>
    </>
    
    );
    
}

export default SearchHeader;