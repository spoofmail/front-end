import { useState, useEffect } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import SearchHeader from './dashboardComponents/SearchHeader';
import EmailItem from './dashboardComponents/EmailItem';

import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchAddresses } from "../../redux/address/addressSlice";
import useWebsocket from "../../hooks/useWebsocket";
import "../../CSS/Dashboard.css"
import useFetchEmails from "../../hooks/useFetchEmails";

export default () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(({ user }) => user.userId)
    const addressesLoading = useAppSelector(({ address }) => address.loading)
    const addressStatus = useAppSelector(({ address }) => address.status)
    const addressIDList = useAppSelector(({ address }) => address.ids)

    const [page, setPage] = useState(1)

    const handleWebsocketEvent = (ev: MessageEvent<any>) => {
        console.log(ev)
        const message = JSON.parse(ev.data)

        console.log(message)

        switch(message.type) {
            case 'auth-success':
                break
            case 'auth-reject':
                break
            case 'message':
                break
        }
    }

    useWebsocket({
        userId,
        onEvent: handleWebsocketEvent,
        pingInterval: 60000,
    })

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [])

    const {
        data,
        total,
        loading,
        error,
    } = useFetchEmails({
        userId,
        page,
        addressIDList,
    })

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
            </div>
            <div className="emails">
                <SearchHeader />
                {
                    (addressesLoading || addressStatus === 'error') ? 
                        _renderLoading() : 
                        <></>
                }
                {
                    loading && !error && (
                        <CircularProgress />
                    )
                }
                {
                    !loading && error && (
                        <h1 className="error" style={{ color: 'red' }}>{error}</h1>
                    )
                }
                {
                    !loading && !error && data.length > 0 && (
                        data.map(email => <EmailItem />)
                    )
                }
                <p>{loading || error ? 'loading' : total}</p>
            </div>
        </div>
    );
}

