import { useEffect, useMemo, useRef, useState } from "react"
import { SpoofmailAPI } from "../App"
import useDebounce from "./useDebounce"
import { EMAILS_PER_PAGE } from "../components/protected/Emails"

interface UseQueryByEmailTextOptions {
    query: string
    from: number
    size: number
}
export default function useQueryByEmailText({
    query = '',
    from = 0,
    size = EMAILS_PER_PAGE,
}: UseQueryByEmailTextOptions) {
    const currentNetworkCall = useRef(0)

    const [emails, setEmails] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [debouncing, setDebouncing] = useState(false)

    const debouncedInput = useDebounce({
        debouncedInput: query,
        debounceTimeout: 1500,
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

    useEffect(() => {
        setDebouncing(debouncedInput !== query)
    }, [debouncedInput, query])

    return useMemo(() => ({
        debouncing,
        emails,
        total,
        loading,
        error,
    }), [
        debouncing,
        emails,
        total,
        loading,
        error,
    ])
}