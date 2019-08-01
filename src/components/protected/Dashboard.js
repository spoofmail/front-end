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
import { Parser } from "html-to-react";
let cookies = new Cookies();
const htmlToReact = new Parser();


ReactModal.setAppElement('#root')

export const fetchAdresses = _ => {
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

export const fetchEmails = id => {
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
    const [emails, setEmailList] = useState({});
    const [emailCount, setEmailCount] = useState(0);

    const [emailVisible, setEmailVisible] = useState(false);
    const [emailData, setEmailData] = useState({});

    const setEmailVisi = value => {
        setEmailVisible(value);
    }
    const setEmailContent = data => {

        setEmailData(data);
    }

    const setEmails = (id, newEmails) => {
        let newEmailList = emails;
        newEmailList[id] = newEmails;
        setEmailList({ ...newEmailList });
    }

    useEffect(_ => {
        document.title = "Dashboard";

        clearInterval(interval);
        interval = null;

        const setAddresseses = _ => {
            fetchAdresses().then(data => {
                if(data.length !== addresses.length)
                    setAddresses(data);
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
            setEmailContent,
            setEmails,
            getEmails: _ => emails
        }}>
            <div className="dash-container">
                <div className="title">
                    <h1>Your Inbox - ({emailCount})</h1>

                </div>
                <div className="emails">
                    <SearchHeader emails = {emails} />
                    <AddressList addresses={addresses} />
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

