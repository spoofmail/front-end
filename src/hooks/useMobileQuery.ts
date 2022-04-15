import { useState, useEffect, useMemo } from 'react'

export default function useMobileQuery(width: number) {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= width)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= width) {
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [width])

    return useMemo(() => isMobile, [isMobile])
}