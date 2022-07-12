import { useCallback, useMemo, useState } from "react";
import { SpoofmailAPI } from "../App";

export default function useVerifyMFA() {
    const [loading, setLoading] = useState(false)
    const [invalidToken, setInvalidToken] = useState(false)
    const [error, setError] = useState('')

    const [success, setSuccess] = useState(false)

    const verifyMFA = useCallback(({ mfaRequestId, token }: { mfaRequestId: string, token: string }) => {
        setLoading(true)
        setSuccess(false)
        setInvalidToken(false)

        SpoofmailAPI.verifyMFA({ mfaRequestId, token })
            .then(response => {
                console.log({response})
                setLoading(false)
                if (response.data.status === 'success') {
                    setError('')
                    setSuccess(true)
                } else {
                    console.log(response.data)
                    if (response.data.message === 'Invalid token') {
                        console.log('here')
                        setSuccess(false)
                        setError('')
                        setInvalidToken(true)
                    } else {
                        setSuccess(false)
                        setError('An error occurred while requesting MFA')
                    }
                }
            })
            .catch(error => {
                setLoading(false)

                if (error.response) {
                    if (error.response.response.data.message === 'Invalid token') {
                        setSuccess(false)
                        setError('')
                        setInvalidToken(true)
                    }
                } else {
                    setError('An error occurred while requesting Msdfg.khjsdfnghjksebrgjhlFA')
                    setSuccess(false)
                }
            })
    }, [])

    return useMemo(() => ({
        success,
        loading,
        error,
        invalidToken,
        verifyMFA,
    }), [
        success,
        loading,
        error,
        invalidToken,
        verifyMFA,
    ])
}