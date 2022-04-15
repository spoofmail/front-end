import { useEffect, useRef, useState } from "react"

interface UseDebounceOptions {
    debouncedInput: string
    debounceTimeout: number
}
export default function useDebounce({
    debouncedInput = '',
    debounceTimeout = 250,
}: UseDebounceOptions) {
    const timeout = useRef(null)
    const [debouncedValue, setDebouncedValue] = useState('')

    useEffect(() => {
        if (timeout.current) {
            clearTimeout(timeout.current)
        }

        if (debouncedInput) {
            timeout.current = setTimeout(() => {
                setDebouncedValue(debouncedInput)
            }, debounceTimeout)
        }

        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current)
            }
        }
    }, [debouncedInput, debounceTimeout])

    return debouncedValue
}