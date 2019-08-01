import React from 'react';
import Email from './Email';

const EmailList = props => {
    if(!props.emails) return <></>;
    return props.emails.map((e, i) => <Email key = {i} data = {e} context = {props.context}/>)
}

export default EmailList;