import { useState, useEffect } from "react";

import CircularProgress from '@mui/material/CircularProgress';

import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { fetchAddresses } from "../../redux/address/addressSlice";
import useWebsocket from "../../hooks/useWebsocket";
import useFetchEmails from "../../hooks/useFetchEmails";
import EmailList from "./EmailList";
import { Search, Cancel, Edit } from "@mui/icons-material";
import { Paper, IconButton, InputBase, Button, Fab } from "@mui/material";
import useQueryByEmailText from "../../hooks/useQueryByEmailText";
import "../../CSS/Dashboard.css"
import useMobileQuery from "../../hooks/useMobileQuery";

export default () => {
    const isMobile = useMobileQuery(598)
    
    const dispatch = useAppDispatch()
    const userId = useAppSelector(({ user }) => user.userId)
    const addressesLoading = useAppSelector(({ address }) => address.loading)
    const addressStatus = useAppSelector(({ address }) => address.status)
    const addressIDList = useAppSelector(({ address }) => address.ids)

    const [queryText, setQueryText] = useState('')
    const [page, setPage] = useState(1)

    /*const handleWebsocketEvent = (ev: MessageEvent<any>) => {
        console.log(ev)
        const message = JSON.parse(ev.data)

        console.log(message)

        switch (message.type) {
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
    })*/

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

    const {
        emails,
        total: queryTotal,
        error: queryError,
        loading: queryLoading,
    } = useQueryByEmailText({
        query: queryText,
        from: (page - 1) * 25,
        size: 25,
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
                <h1>Emails</h1>
            </div>

            <div className="emails">
                <div className="header">
                    <Paper elevation={1} style={{ display: 'flex', flexGrow: 1, }}>
                        <IconButton disableFocusRipple disableTouchRipple size="large">
                            <Search />
                        </IconButton>
                        <InputBase
                            value={queryText}
                            onChange={(e) => setQueryText(e.target.value)}
                            placeholder="Search"
                            sx={{ flexGrow: 1, }}
                        />
                        <IconButton disableFocusRipple disableTouchRipple onClick={() => setQueryText('')} size="large">
                            <Cancel />
                        </IconButton>
                    </Paper>

                    { !isMobile && <Button variant="contained" color="primary" onClick={_ => (true)} style={{ marginLeft: '15px', }}>Send Email</Button> }
                    { isMobile && (
                        <Fab color="primary" variant="extended" aria-label="Add Address" sx={{ position: 'absolute', right: 10, bottom: 66 }}>
                            <Edit />
                            Compose
                        </Fab>
                    ) }
                </div>
                {
                    (error || queryError) && (
                        <h1 className="error" style={{ color: 'red' }}>{error}</h1>
                    )
                }
                {
                    queryText === '' && !error && (
                        data.length === 0 ? (
                            <span style={{ marginTop: 15, color: 'var(--font-color)', width: '100%' }}>No Emails yet</span>
                        ): (
                            <EmailList
                                emails={data}
                                currentPage={page}
                                totalResults={total}
                                perPage={25}
                                onPageChange={page => { setPage(page) }}
                                onSelect={id => { }}
                            />
                        )
                    )
                }
                {
                    queryText !== '' && !queryError && (
                        emails.length === 0 ? (
                            <span style={{ marginTop: 15, color: 'var(--font-color)', width: '100%' }}>No Emails found matching your criteria</span>
                        ): (
                            <EmailList
                                emails={emails}
                                currentPage={page}
                                totalResults={queryTotal}
                                perPage={25}
                                onPageChange={page => { setPage(page) }}
                                onSelect={id => { }}
                            />
                        )
                    )
                }
            </div>
        </div>
    );
}

