import { LoadingButton } from "@mui/lab"
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@mui/material"
import React, { FC, useCallback, useMemo, useState } from "react"
import Cookies from "universal-cookie"
import { useAppDispatch } from "../hooks/useRedux"
import { addAddress } from "../redux/address/addressSlice"

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
        dispatch(addAddress({ address: data.saved }))
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
        <Dialog open={open} onClose={handleModalClose} fullWidth>
            <DialogTitle>New Inbox</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Generate a randomized inbox
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Label"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={handleLabelChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleModalClose} disabled={loading}>Cancel</Button>
                <LoadingButton onClick={handleCreateEmail} loading={loading} variant="outlined">
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

        // @ts-ignore
        fetch(`${window.serverURL}/api/addresses`, {
            headers: {
                'Authorization': cookies.get("token"),
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({ addresstag: name })
        }).then(res => res.json()).then(data => {
            setLoading(false)
            onSuccess(data)
        })
        .catch((err) => {
            setLoading(false)
            setError('An error occured while generating a new address')
            onError()
        })
    }, [name])

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