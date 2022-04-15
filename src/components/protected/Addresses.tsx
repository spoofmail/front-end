import { useEffect, useState } from "react"
import { Cancel, Search, Add } from "@mui/icons-material"
import { Paper, IconButton, InputBase, Button, Fab, CircularProgress, styled } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"

import { fetchAddresses } from "../../redux/address/addressSlice"
import useMobileQuery from "../../hooks/useMobileQuery"
import AddAddressModal from "../AddAddress"
import AddressItem from "./AddressItem"

const LoadingAddressContainer = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}))

export const Addresses = () => {
    const isMobile = useMobileQuery(598)

    const dispatch = useAppDispatch()

    const addressesLoading = useAppSelector(({ address }) => address.loading)
    const addressStatus = useAppSelector(({ address }) => address.status)
    const addressIDList = useAppSelector(({ address }) => address.ids)

    const [queryText, setQueryText] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [])

    return (
        <div className="dash-container">
            <div className="title">
                <h1>Addresses</h1>
            </div>

            <AddAddressModal open={modalOpen} onClose={() => setModalOpen(false)} />

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

                    { !isMobile && <Button variant="contained" color="primary" onClick={_ => setModalOpen(true)} style={{ marginLeft: '15px', }}>Create Address</Button> }
                    { isMobile && (
                        <Fab color="primary" variant="extended" aria-label="Add Address" onClick={() => setModalOpen(true)} sx={{ position: 'absolute', right: 10, bottom: 66 }}>
                            <Add />
                            Address
                        </Fab>
                    ) }
                </div>
                { addressesLoading && (
                    <LoadingAddressContainer>
                        <CircularProgress size={34} />
                    </LoadingAddressContainer>
                ) }
                { addressStatus === 'error' && !addressesLoading && (
                    <LoadingAddressContainer>
                        <span style={{ color: 'red' }}>An error occurred while trying to load your addresses</span>
                    </LoadingAddressContainer>
                ) }
                { !addressesLoading && addressStatus === 'success' && addressIDList.length === 0 && (
                    <LoadingAddressContainer>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'var(--font-color)', marginBottom: 15 }}>No Addresses found</span>
                            <Button color="primary" variant="contained" onClick={() => setModalOpen(true)}>Add Address</Button>
                        </div>
                    </LoadingAddressContainer>
                ) }
                { !addressesLoading && addressStatus === 'success' && addressIDList.length > 0 && (
                    addressIDList.map(addressID => <AddressItem id={addressID} />)
                ) }
            </div>
        </div>
    )
}

export default Addresses