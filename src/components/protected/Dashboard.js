import React, { useState, useEffect } from "react";
import { Button, Paper, InputBase, IconButton } from "@material-ui/core";
import { Search, Cancel } from "@material-ui/icons"
import { makeStyles } from '@material-ui/core/styles';
import Inbox from './Inbox';

/*import { Parser } from "html-to-react";
const externalize = new Parser();
{ externalize.parse(data.html) }*/

import "../../CSS/Dashboard.css"

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
    const classes = useStyles();

    const [search, setSearch] = useState("");

    useEffect(_ => {
        document.title = "Dashboard";
    }, [])

    const handleChange = e => {
        setSearch(e.currentTarget.value)
    }

    const resetSearch = _ => {
        setSearch("")
    }

    return (
        <div className="dash-container">
            <div className="title">
                <h1>Your Inbox - ({"50"})</h1>
                
            </div>
            <div className="emails">
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
                <div className="body">
                <Inbox />
                </div>
            </div>
        </div>
    );
}

/*function generateRandomName(length) {
    let a = "abcdefghijklmnopqrstuvwxyz"

    let name = ""

    for (let i = 0; i < length; i++) {
        name += a.charAt(Math.random() * a.length);
    }

    return name;
}*/