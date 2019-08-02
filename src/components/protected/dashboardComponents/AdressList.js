import React from 'react';
import Address from './Adress';


export const AddressList = props => {
    let reverse = Array.from(props.addresses).reverse();
    return (
        <div className="body">
            { 
                reverse.length === 0 ? 
                <h1 style = {{ backgroundColor: "var(--primary-color)", padding: 15, boxShadow: "0 0 4px black" }}>Click "Generate Email" to create an inbox</h1> : 
                reverse.map((e, i) => <Address key = {e.id} data = {e} id = {e.id} />)
            }
        </div>
    );
}