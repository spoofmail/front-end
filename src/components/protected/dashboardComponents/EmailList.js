import React, { useState, useEffect, useContext } from 'react';
import Email from './Email';

import EmailStore from "../../../stores/email-store"

import { fetchEmails } from "../Dashboard"

let intervals = {};

const EmailList = props => {
    const context = useContext(EmailStore);

    const [emails, setEmails] = useState([]);

    useEffect(_ => {
        clearInterval(intervals[props.id]);

        intervals[props.id] = setInterval(_ => {
            fetchEmails(props.id).then(data => {
                if(!data || data.length === 0) {
                    setEmails([]);
                    context.setEmails(props.id, []);
                }
                else if(!emails || data.length !== emails.length) {
                    setEmails(data);
                    context.setEmails(props.id, data);
                }
            })
        }, 1000)

        return _ => {
            clearInterval(intervals[props.id]);
        }
    }, [])


    if(!emails) return <></>;
    else {

        let reversed = Array.from(emails).reverse();
        if(emails.length !== 0)
            return (
                reversed.map((e, i) => <Email key = {e.id} data = {e} context = {props.context}/>)
            )
        else return <h3 style = {{ backgroundColor: "var(--primary-color)", color: "var(--font-color)", padding: 15, margin: 0 }}>- No Emails here</h3>
    }
}

export default EmailList;