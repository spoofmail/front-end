import React, { useState, useEffect } from "react";


import EmailStore from "../../stores/email-store";

import ReactModal from "react-modal";


import "../../CSS/Dashboard.css"

import SearchHeader from './dashboardComponents/SearchHeader';

import { addressesList, emailData } from './DummyData';
import { AddressList } from './dashboardComponents/AdressList';
import { ViewEmail, Email } from './dashboardComponents/Email';
import "../../CSS/Dashboard.css"
import { customStyles } from './customStyles';

import Cookies from "universal-cookie";
let cookies = new Cookies();
const htmlToReact = new Parser();


ReactModal.setAppElement('#root')

const fetchAdresses = _ => {
    return new Promise(function(resolve, reject) {
        fetch(`${window.serverURL}/api/addresses`, {
            headers: {
                'Authorization': cookies.get("token")
            }
        }).then(res => res.json()).then(data => {
            resolve(data);
        })
    })
}

const fetchEmails = id => {
    return new Promise(function(resolve, reject) {
        fetch(`${window.serverURL}/api/messages/${id}`, {
            headers: {
                'Authorization': cookies.get("token")
            }
        }).then(res => res.json()).then(data => {
            resolve(data);
        })
    })
}

let interval = null;

export default _ => {
    const [addresses, setAddresses] = useState([]);
    const [emails, setEmails] = useState({});
    const [emailCount, setEmailCount] = useState(0);

    const [emailVisible, setEmailVisible] = useState(false);
    const [emailData, setEmailData] = useState({});

    const setEmailVisi = value => {
        setEmailVisible(value);
    }
    const setEmailContent = data => {

        setEmailData(data);
    }

    useEffect(_ => {
        document.title = "Dashboard";

        clearInterval(interval);
        interval = null;

        const setAddresseses = _ => {
            fetchAdresses().then(data => {
                let promiseArr = []
                data.forEach(address => {
                    promiseArr.push(fetchEmails(address.id))
                })
    
                Promise.all(promiseArr).then(data2 => {
                    let amount = 0;
                    let newEmailObj = {};
                    
                    if(!data2 || data2.length === 0) {
                        setAddresses(data);
                    }
                    else {
                        console.log(data2)
                        data2.forEach(e => {
                            if(!e || e.length === 0) {
    
                            }
                            else {
                                let id = e[0].address_id;
                                console.log(id)
                                newEmailObj[id] = e;
                                amount += e.length;
                            }
                        })
                        
                        if(data.length !== addresses.length)
                            setAddresses(data);
                        setEmails(newEmailObj);
                        setEmailCount(amount);
                    }
                    
                })
            })
        }

        interval = setInterval(setAddresseses, 5000);
        setAddresseses();

        return _ => {
            clearInterval(interval);
        }
        
    }, [])
    // Im guessing the email store has already been built out, but the .js is one line long so I wanted to ask
    return (
        <EmailStore.Provider value={{
            openEmail: _ => setEmailVisi(true),
            closeEmail: _ => setEmailVisi(false),
            setEmailContent
        }}>
            <div className="dash-container">
                <div className="title">
                    <h1>Your Inbox - ({emailCount})</h1>

                </div>
                <div className="emails">
                    <SearchHeader emails = {emails} />
                    <AddressList addresses={addresses} emails={emails} />
                </div>
                <ReactModal
                    isOpen={emailVisible}
                    onRequestClose={_ => setEmailVisi(false)}
                    style={customStyles}
                    contentLabel={"Email"}
                >
                    <ViewEmail data={emailData} />
                </ReactModal>
            </div>
        </EmailStore.Provider>
    );
}

