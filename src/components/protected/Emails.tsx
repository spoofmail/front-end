import { useState, useEffect } from "react";

import { Search, Cancel, Edit } from "@mui/icons-material";
import { Paper, IconButton, InputBase, Button, Fab, styled } from "@mui/material";

import EmailList from "./EmailList";
import Email from "../../types/Email";
import SearchInput from "../SearchInput";

import { fetchAddresses } from "../../redux/address/addressSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";

import useFetchEmails from "../../hooks/useFetchEmails";
import useQueryByEmailText from "../../hooks/useQueryByEmailText";
import useMobileQuery from "../../hooks/useMobileQuery";

export const EMAILS_PER_PAGE = 500

const RootContainer = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
}))

const EmailContainer = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
}))

export default () => {
    const isMobile = useMobileQuery(598)
    
    const dispatch = useAppDispatch()
    const userId = useAppSelector(({ user }) => user.userId)
    const addressesLoading = useAppSelector(({ address }) => address.loading)
    const addressStatus = useAppSelector(({ address }) => address.status)
    const addressIDList = useAppSelector(({ address }) => address.ids)

    const [editMode, setEditMode] = useState(false)
    const [queryText, setQueryText] = useState('')
    const [page, setPage] = useState(1)
    const [filterOpen, setFilterOpen] = useState(false)

    const [selected, setSelected] = useState(new Set())

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
        size: EMAILS_PER_PAGE,
    })

    const {
        debouncing,
        emails,
        total: queryTotal,
        error: queryError,
        loading: queryLoading,
    } = useQueryByEmailText({
        query: queryText,
        from: (page - 1) * EMAILS_PER_PAGE,
        size: EMAILS_PER_PAGE,
    })

    const handleSelect = (id: Email['id']) => {
        if (selected.has(id)) {
            selected.delete(id)
        } else {
            selected.add(id)
        }

        setSelected(new Set(Array.from(selected)))
    }

    return (
        <RootContainer>

            <EmailContainer>
                <SearchInput 
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    onClear={() => setQueryText('')}
                    inputAdornment={
                        <>
                            { !isMobile && <Button variant="contained" color="primary" onClick={_ => (true)} style={{ marginLeft: '15px', }}>Send Email</Button> }
                        </>
                    }
                    filters
                    filterOpen={filterOpen}
                    onFilterOpenChange={(open) => setFilterOpen(open)}
                />
                { isMobile && (
                    <Fab color="primary" variant="extended" aria-label="Add Address" sx={{ position: 'absolute', right: 10, bottom: 66 }}>
                        <Edit />
                        Compose
                    </Fab>
                ) }
                {
                    (error || queryError) && (
                        <h1 className="error" style={{ color: 'red' }}>{error}</h1>
                    )
                }
                {
                    queryText === '' && !error && (
                        data.length === 0 ? (
                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ color: 'var(--font-color)' }}>No Emails yet</span>
                            </div>
                        ): (
                            <EmailList
                                emails={data}
                                currentPage={page}
                                totalResults={total}
                                perPage={EMAILS_PER_PAGE}
                                onPageChange={page => { setPage(page) }}
                                onSelect={handleSelect}
                                selected={id => selected.has(id)}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                loading={loading}
                            />
                        )
                    )
                }
                {
                    queryText !== '' && !queryError && !queryLoading && !debouncing && (
                        emails.length === 0 ? (
                            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <span style={{ color: 'var(--font-color)' }}>No Emails found matching your criteria.</span>
                            </div>
                        ): (
                            <EmailList
                                emails={emails}
                                currentPage={page}
                                totalResults={queryTotal}
                                perPage={EMAILS_PER_PAGE}
                                onPageChange={page => { setPage(page) }}
                                onSelect={handleSelect}
                                selected={id => selected.has(id)}
                                editMode={editMode}
                                setEditMode={setEditMode}
                                loading={queryLoading}
                            />
                        )
                    )
                }
            </EmailContainer>
        </RootContainer>
    );
}

