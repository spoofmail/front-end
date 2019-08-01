import React, { useState, useEffect} from "react";


import EmailStore from "../../stores/email-store";

import ReactModal from "react-modal";


import SearchHeader from './dashboardComponents/SearchHeader';



import {addressesList, emailData} from './DummyData';
import {AddressList} from './dashboardComponents/AdressList';
import {ViewEmail, Email} from './dashboardComponents/Email';
import "../../CSS/Dashboard.css"
import {customStyles} from './customStyles';


ReactModal.setAppElement('#root')

const fakeFetchAddress = _ => {
    return new Promise(function(resolve, reject) {
        setTimeout(_ => resolve(addressesList), 100);
    })
}

const fakeFetchEmails = id => {
    return new Promise(function(resolve, reject) {
        setTimeout(_ => resolve(emailData.filter(e => e.address_id === id)), 100);
    })
}
// ---- dont forget to ask vince and jack about the email server and which components actually dont need to be importing it

export default _ => {
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState({});
    const [emailCount, setEmailCount] = useState(0);

    const [emailVisible, setEmailVisible] = useState(false);
    const [emailData, setEmailData] = useState({});

    console.log(emailVisible, emailData);

    const setEmailVisi = value => {
        setEmailVisible(value);
    }

    const setEmailContent = data => {
        setEmailData(data);
    }

    useEffect(_ => {
        document.title = "Dashboard";
        fakeFetchAddress().then(data => {
            let promiseArr = []
            data.forEach(address => {
                promiseArr.push(fakeFetchEmails(address.id))
            })

            Promise.all(promiseArr).then(data2 => {
                let amount = 0;
                let newEmailObj = {};
                
                data2.forEach(e => {
                    let id = e[0].address_id;
                    newEmailObj[id] = e;
                    amount += e.length;
                })

                setAddresses(data);
                setEmails(newEmailObj);
                setEmailCount(amount);
            })
        })
    }, [])
// Im guessing the email store has already been built out, but the .js is one line long so I wanted to ask
    return (
        <EmailStore.Provider value = {{ openEmail: _ => setEmailVisi(true), 
                                        closeEmail: _ => setEmailVisi(false),
                                        setEmailContent }}>
            <div className="dash-container">
                <div className="title">
                    <h1>Your Inbox - ({emailCount})</h1>
                    
                </div>
                <div className="emails">
                    <SearchHeader  />
                    <AddressList addresses = {addresses} emails = {emails}/>
                </div>
                <ReactModal
                    isOpen = {emailVisible}
                    onRequestClose = {_ => setEmailVisi(false)}
                    style = {customStyles}
                    contentLabel = {"Email"}
                >
                    <ViewEmail data = {emailData} />
                </ReactModal>
            </div>
        </EmailStore.Provider>
    );
}
