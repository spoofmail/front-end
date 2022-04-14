import { useEffect, useMemo, useRef, useState } from "react"
import { SpoofmailAPI } from "../App"
import Address from "../types/Address"
import Email from "../types/Email"

interface FetchEmailsProps {
    userId: Email['address_id']
    page: number
    addressIDList: Array<Address['id']>
}
export default function useFetchEmails({
    userId,
    page,
    addressIDList,
}: FetchEmailsProps) {
    const networkCounterRef = useRef(0)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [data, setData] = useState<Array<Email>>([])
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let active = true

        networkCounterRef.current += 1
        const myNumber = networkCounterRef.current

        try {
            if (active && myNumber === networkCounterRef.current) {
                setLoading(true)
                setError('')
                
                SpoofmailAPI.getAllEmails({
                    page,
                    perPage: 25,
                })
                .then(response => {
                    if (active && myNumber === networkCounterRef.current) {
                        setData(response.data.messages)
                        setTotal(response.data.total)
                        setLoading(false)
                    }
                })
                .catch(err => {
                    if (active && myNumber === networkCounterRef.current) {
                        setError('An error occurred')
                        setLoading(false)
                    }   
                })
            }
        } catch (err) {
            if (active && myNumber === networkCounterRef.current) {
                setLoading(false)
                setError('An error occurred')
            }
        }

        return () => {
            active = false
        }
    }, [userId, page, addressIDList])

    return useMemo(() => ({
        data,
        total,
        error,
        loading,
    }), [
        data,
        total,
        loading,
        error,
    ])
}
