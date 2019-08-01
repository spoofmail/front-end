import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Paper, InputBase, IconButton, TextField } from "@material-ui/core";
import { Search, Cancel, Trash } from "@material-ui/icons"
import Email from './Email';
import {useStyles} from '../customStyles';
import EmailStore from '../../../stores/email-store';

const SearchHeader = props => {
    const classes = useStyles();
    const context = useContext(EmailStore);

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const handleChange = e => {
        setSearch(e.currentTarget.value)

    }

    useEffect(_ => {    
        console.log('props', props);
        let allEmails =[];
        Object.keys(props.emails).forEach(key => {

            for(let i of props.emails[key] ){
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
    ,[search])
    
//|| email.text.includes(search)

    const resetSearch = _ => {
        setSearch("")
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
          
            <Button variant="contained" color="primary" style={{ width: 250 }}>Generate Email</Button>
        </div>
        <div className="filteredEmails">
            {filtered.map( (result, i) => {
            return  <Email key = {i} data = {result} context = {context} />
            })}
        
        </div>
    </>
    
    );
    
}

export default SearchHeader;