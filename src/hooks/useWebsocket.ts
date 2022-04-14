import { useEffect, useMemo, useRef, useState } from "react"
import Cookies from "universal-cookie"

interface WebsocketOptions {
    userId: string
    pingInterval: number
    onEvent: (event: MessageEvent<any>) => void
}
export default function useWebsocket({
    pingInterval = 60000,
    onEvent,
    userId,
}: WebsocketOptions) {
    const [websocketState, setWebsocketState] = useState<'idle' | 'connected'>('idle')

    const websocket = useRef<WebSocket>(null)
    const interval = useRef(0)
    
    const connectWebsocket = () => {
        const params = new URLSearchParams({
            userId,
        })
        websocket.current = new WebSocket(`ws://localhost:8080/ws?${params.toString()}`)
        websocket.current.onopen = () => {
            setWebsocketState('connected')
            clearInterval(interval.current)
            // @ts-ignore
            interval.current = setInterval(() => {
                if (websocket.current.readyState === WebSocket.OPEN) {
                    websocket.current.send(JSON.stringify({ msg: 'ping' }))
                }
            }, pingInterval)

            websocket.current.send(JSON.stringify({
                type: 'auth',
                token: localStorage.getItem('user_token')
            }))
        }

        websocket.current.onerror = (ev: any) => {
            console.error(ev)
        }

        websocket.current.onclose = () => {
            console.log('closed')
        }

        websocket.current.onmessage = onEvent
    }

    useEffect(() => {
        if (userId)
            connectWebsocket()

        return () => {
            clearInterval(interval.current)
            if (websocket.current.OPEN) {
                websocket.current.close()
            }
        }
    }, [userId])
}