import React, { useState, useEffect, useContext } from 'react';
import Email from './Email';

import EmailStore from "../../../stores/email-store"

import { fetchEmails } from "../Dashboard"

const EmailList = props => {
    const context = useContext(EmailStore);

    const [emails, setEmails] = useState([]);
    const [emailInterval, setEmailInterval] = useState(null);

    useEffect(_ => {
        clearInterval(emailInterval);

        setEmailInterval(setInterval(_ => {
            fetchEmails(props.id).then(data => {
                console.log(data);
                if(!emails || data.length !== emails.length) {
                    setEmails(data);
                    context.setEmails(props.id, data);
                }
            })
        }, 5000))

        return _ => {
            clearInterval(emailInterval);
        }
    }, [])


    if(!emails) return <></>;
    else {

        let reversed = Array.from(emails).reverse();
        if(emails.length !== 0)
            return (
                reversed.map((e, i) => <Email key = {e.id} data = {e} context = {props.context}/>)
            )
        else return <h1>No Emails here</h1>
    }
}

export default EmailList;