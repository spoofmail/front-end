import { useEffect, useState } from "react"
import { Cancel, Search, Add } from "@mui/icons-material"
import { Paper, IconButton, InputBase, Button, Fab, CircularProgress, styled } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux"

import { fetchAddresses } from "../../redux/address/addressSlice"
import useMobileQuery from "../../hooks/useMobileQuery"
import AddAddressModal from "../AddAddress"
import AddressItem from "./AddressItem"
import SearchInput from "../SearchInput"

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

const SearchHeaderContainer = styled('div')(() => ({
    margin: '15px',
}))

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
    const addressList = useAppSelector(({ address }) => Object.values(address.map))

    const [queryText, setQueryText] = useState('')
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        dispatch(fetchAddresses())
    }, [])

    return (
        <RootContainer>
            <AddAddressModal open={modalOpen} onClose={() => setModalOpen(false)} />

            <EmailContainer>
                <SearchInput 
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    onClear={() => setQueryText('')}
                    inputAdornment={
                        <>
                            { !isMobile && (
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    onClick={_ => setModalOpen(true)} 
                                    style={{ marginLeft: '15px', }}
                                >
                                    Create Address
                                </Button>
                            ) }
                        </>
                    }
                />
                { isMobile && (
                    <Fab color="primary" variant="extended" aria-label="Add Address" onClick={() => setModalOpen(true)} sx={{ position: 'absolute', right: 10, bottom: 66 }}>
                        <Add />
                        Address
                    </Fab>
                ) }
                {addressesLoading && (
                    <LoadingAddressContainer>
                        <CircularProgress size={34} />
                    </LoadingAddressContainer>
                )}
                {addressStatus === 'error' && !addressesLoading && (
                    <LoadingAddressContainer>
                        <span style={{ color: 'red' }}>An error occurred while trying to load your addresses</span>
                    </LoadingAddressContainer>
                )}
                {!addressesLoading && addressStatus === 'success' && addressList.length === 0 && (
                    <LoadingAddressContainer>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ color: 'var(--font-color)', marginBottom: 15 }}>No Addresses found</span>
                            <Button color="primary" variant="contained" onClick={() => setModalOpen(true)}>Add Address</Button>
                        </div>
                    </LoadingAddressContainer>
                )}
                {!addressesLoading && addressStatus === 'success' && addressList.length > 0 && (
                    addressList.filter(address => queryText === '' ? true : address.addressname.includes(queryText) || (address.addresstag && address.addresstag.includes(queryText))).map(address => <AddressItem id={address.id} />)
                )}
            </EmailContainer>
        </RootContainer>
    )
}

export default Addresses