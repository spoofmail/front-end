import { LoadingButton } from "@mui/lab"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material"
import React, { FC, useCallback, useMemo, useState } from "react"
import Cookies from "universal-cookie"
import { useAppDispatch } from "../hooks/useRedux"
import { addAddress } from "../redux/address/addressSlice"
import { SpoofmailAPI } from '../App'

interface AddEmailModalProps {
    open: boolean
    onClose: () => void
}
export const AddEmailModal: FC<AddEmailModalProps> = ({ 
    open, 
    onClose,
}) => {
    const dispatch = useAppDispatch()

    const handleAddEmailSuccess = useCallback((data: any) => {
        console.log(dispatch, data)
        dispatch(addAddress({ address: data.data.saved }))
        onClose()
    }, [dispatch])

    const {
        name,
        setName,
        loading,
        error,
        addEmail,
    } = useAddEmail({
        onSuccess: handleAddEmailSuccess,
    })

    const handleCreateEmail = () => {
        addEmail()
    }

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }   

    const handleModalClose = () => {
        if (loading) return

        onClose()
    }

    return (
        <Dialog 
            open={open} 
            onClose={handleModalClose} 
            fullWidth
            PaperProps={{
                style: {
                    backgroundColor: 'var(--background-color)',
                    color: 'var(--font-color)'
                }
            }}
        >
            <DialogTitle>New Inbox</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ color: 'var(--font-color)', marginBottom: '10px' }}>
                    Generate a randomized inbox
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Label"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={handleLabelChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose} disabled={loading}>Cancel</Button>
                <LoadingButton onClick={handleCreateEmail} loading={loading} variant="contained">
                    Generate
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

interface AddEmailHookOptions {
    onSuccess?: (data) => void
    onError?: () => void
}
export function useAddEmail({
    onSuccess = () => {},
    onError = () => {},
}: AddEmailHookOptions) {
    const cookies = new Cookies()

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const addEmail = useCallback(() => {
        setLoading(true)
        setError('')

        SpoofmailAPI.createAddress({ addresstag: name })
            .then(data => {
                setLoading(false)
                onSuccess(data)
            })
            .catch((err) => {
                setLoading(false)
                setError('An error occured while generating a new address')
                onError()
            })
    }, [name, onSuccess, onError])

    return useMemo(() => ({
        name,
        setName,
        loading,
        error,
        addEmail,
    }), [
        name,
        setName,
        loading,
        error,
        addEmail,
    ])
}

export default AddEmailModal