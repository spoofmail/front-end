import React, { useState, useEffect, useRef, useContext } from "react";
import { Button, Paper, InputBase, IconButton, TextField } from "@material-ui/core";
import { Search, Cancel, KeyboardArrowDown, KeyboardArrowUp, Trash } from "@material-ui/icons"

import {useStyles} from '../customStyles';

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

export default SearchHeader;