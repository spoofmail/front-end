import React from 'react';
import Address from './Adress';


export const AddressList = props => {

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