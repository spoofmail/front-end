import { useState, useEffect } from "react";
import { Button, Paper, InputBase, IconButton } from "@mui/material";
import { Search, Cancel } from "@mui/icons-material"
import Email from './Email';
import { useStyles } from '../customStyles';

import AddEmailModal from "../../AddEmail";

const SearchHeader = props => {
    const classes = useStyles();

    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [generateVisi, setGenerateVisi] = useState(false)

    const handleChange = e => {
        setSearch(e.currentTarget.value)
    }

    useEffect(() => {
        const filterEmails = () => {
            const allEmails = [];
            Object.keys({}).forEach(key => {

                for (let i of []) {
                    allEmails.push(i)
                }
            })

            const searchText = search.toLowerCase()

            const filteredEmails = allEmails.filter(email => email.from.toLowerCase().includes(searchText) ||
                email.subject.toLowerCase().includes(searchText) ||
                email.text.toLowerCase().includes(searchText))

            setFiltered(filteredEmails);
        }

        if (search && search.length !== 0 && search !== '') {
            filterEmails();
        }
        else {
            resetSearch();
        }
    }, [search])

    const resetSearch = () => {
        setSearch("")
        setFiltered([]);
    }

    const _renderSearchResults = () => {
        if (search !== "" && filtered.length === 0) {
            return <h1 style={{ color: "var(--font-color)", backgroundColor: "var(--primary-color)", padding: 15, boxShadow: "0 0 4px black" }}>No content matched "{search}"</h1>;
        }
        else {
            return filtered.map((result, i) => <Email key={i} data={result} deleteEmail={() => {}} />)
        }
    }

    return <>
        <div className="header">
            <Paper elevation={1}>
                <IconButton disableFocusRipple disableTouchRipple size="large">
                    <Search />
                </IconButton>
                <InputBase
                    className={classes.textField}
                    value={search}
                    onChange={handleChange}
                    placeholder="Search"
                />
                <IconButton disableFocusRipple disableTouchRipple onClick={resetSearch} size="large">
                    <Cancel />
                </IconButton>
            </Paper>

            <Button variant="contained" color="primary" style={{ width: 250 }} onClick={_ => setGenerateVisi(true)}>Generate Inbox</Button>
        </div>
        <div className="filteredEmails">

            {_renderSearchResults()}
        </div>
        <AddEmailModal open={generateVisi} onClose={() => setGenerateVisi(false)} />
    </>;

}

export default SearchHeader;