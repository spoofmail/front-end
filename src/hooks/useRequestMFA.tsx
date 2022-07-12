import { useCallback, useMemo, useState } from "react";
import { SpoofmailAPI } from "../App";

export default function useRequestMFA() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [base32, setBase32] = useState('')
    const [mfaRequestId, setMFARequestId] = useState('')
    const [secret, setSecret] = useState('')

    const requestMFA = useCallback(() => {
        setLoading(true)

        SpoofmailAPI.requestMFA()
            .then(response => {
                setLoading(false)
                if (response.data.status === 'success') {
                    setError('')
                    setMFARequestId(response.data.mfaRequestId)
                    setSecret(response.data.otpauth_url)
                    setBase32(response.data.base32)
                } else {
                    setError('An error occurred while requesting MFA')
                    setMFARequestId('')
                    setSecret('')
                }
            })
            .catch(error => {
                setLoading(false)
                setError('An error occurred while requesting MFA')
                setMFARequestId('')
                setSecret('')
            })
    }, [])

    return useMemo(() => ({
        base32,
        mfaRequestId,
        secret,
        loading,
        error,
        requestMFA,
    }), [
        base32,
        mfaRequestId,
        secret,
        loading,
        error,
        requestMFA,
    ])
}