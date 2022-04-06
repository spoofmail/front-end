import React, { useState, useEffect, useCallback } from "react";


import EmailStore from "../../stores/email-store";

import ReactModal from "react-modal";


import "../../CSS/Dashboard.css"

import SearchHeader from './dashboardComponents/SearchHeader';
import WebsocketHandler from './dashboardComponents/WebsocketHandler'
import CircularProgress from '@mui/material/CircularProgress';

import { AddressList } from './dashboardComponents/AdressList';
import { ViewEmail } from './dashboardComponents/Email';
import "../../CSS/Dashboard.css"
import { customStyles } from './customStyles';

import Cookies from "universal-cookie";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchAddresses } from "../../redux/address/addressSlice";
import useWebsocket from "../../hooks/useWebsocket";
let cookies = new Cookies();


ReactModal.setAppElement('#root')

export const fetchEmails = id => {
    return new Promise(function (resolve, reject) {
        // @ts-ignore
        fetch(`${window.serverURL}/api/messages/${id}`, {
            headers: {
                'Authorization': cookies.get("token")
            }
        }).then(res => res.json()).then(data => {
            resolve(data);
        })
    })
}

export default () => {
    const addressesLoading = useAppSelector(({ address }) => address.loading)
    const addressStatus = useAppSelector(({ address }) => address.status)

    const dispatch = useAppDispatch()

    const handleWebsocketEvent = (ev: MessageEvent<any>) => {
        const message = JSON.parse(ev.data)

        console.log(message)

        switch(message.type) {
            case '':
                break
        }
    }

    useWebsocket({
        onEvent: handleWebsocketEvent,
        pingInterval: 60000,
    })

    const [websocket, setWebsocket] = useState(null)
    const [websocketOpen, setWebsocketOpen] = useState(true)

    useEffect(() => {
        if (websocketOpen && !addressesLoading && addressStatus === 'pending') {
            
        }
    }, [websocketOpen, addressStatus, addressesLoading])

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [])

    const _renderLoading = () => {
        if (addressesLoading) {
            return (
                <div className="loading-container">
                    <CircularProgress size={60} color="primary" />
                    <h1 style={{ color: 'var(--font-color)' }}>Addresses Loading</h1>
                </div>
            )
        } else if (addressStatus === 'error') {
            return (
                <div className="loading-container">
                    <h1 style={{ color: 'var(--font-color)' }}>An error occurred while fetching your addresses</h1>
                </div>
            )
        }
    }

    return (
        <div className="dash-container">
            <div className="title">
                <h1>Your Inboxes</h1>
                { /* <WebsocketHandler addEmail={() => {}} /> */ }
            </div>
            <div className="emails">
                <SearchHeader />
                {
                    (addressesLoading || addressStatus === 'error') ? 
                        _renderLoading() : 
                        <AddressList />
                }
            </div>
            <ReactModal
                isOpen={false}
                onRequestClose={() => {}}
                style={customStyles}
                contentLabel={"Email"}
            >
                <ViewEmail data={null} />
            </ReactModal>
        </div>
    );
}

