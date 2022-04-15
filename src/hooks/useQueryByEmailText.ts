import { useEffect, useMemo, useRef, useState } from "react"
import { SpoofmailAPI } from "../App"
import useDebounce from "./useDebounce"

interface UseQueryByEmailTextOptions {
    query: string
    from: number
    size: number
}
export default function useQueryByEmailText({
    query = '',
    from = 0,
    size = 25,
}: UseQueryByEmailTextOptions) {
    const currentNetworkCall = useRef(0)

    const [emails, setEmails] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const debouncedInput = useDebounce({
        debouncedInput: query,
        debounceTimeout: 250,
    })

    useEffect(() => {
        let active = true

        if (debouncedInput) {
            let myCounter = ++currentNetworkCall.current

            if (active && myCounter === currentNetworkCall.current) {
                setLoading(true)
                setError('')

                SpoofmailAPI.getEmailsByText({
                    query: debouncedInput,
                    from,
                    size,
                })
                    .then(response => {
                        if (active && myCounter === currentNetworkCall.current) {
                            setLoading(false)
                            if (response.data.status === 'error') {
                                setError('An error occurred while querying for emails')
                                setTotal(0)
                            } else {
                                setEmails(response.data.emails)
                                setTotal(response.data.total)
                            }
                        }
                    })
                    .catch(err => {
                        if (active && myCounter === currentNetworkCall.current) {
                            setLoading(false)
                            setError('An error occurred while querying for emails')
                            setTotal(0)
                        }
                    })
            }
        }

        return () => {
            active = false
        }
    }, [debouncedInput, from, size])

    return useMemo(() => ({
        emails,
        total,
        loading,
        error,
    }), [
        emails,
        total,
        loading,
        error,
    ])
}