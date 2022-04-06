import { useEffect, useMemo, useRef, useState } from "react"
import Cookies from "universal-cookie"

interface WebsocketOptions {
    pingInterval: number
    onEvent: (event: MessageEvent<any>) => void
}
export default function useWebsocket({
    pingInterval = 60000,
    onEvent,
}: WebsocketOptions) {
    const [websocketState, setWebsocketState] = useState<'idle' | 'connected'>('idle')
    const cookies = new Cookies()

    const websocket = useRef<WebSocket>(null)
    const interval = useRef(0)
    
    const connectWebsocket = () => {
        websocket.current = new WebSocket(`wss://spoofmail-lambda.herokuapp.com/ws?token=${cookies.get("token")}`)
        websocket.current.onopen = () => {
            setWebsocketState('connected')
            clearInterval(interval.current)
            // @ts-ignore
            interval.current = setInterval(() => {
                if (websocket.current.readyState === WebSocket.OPEN) {
                    websocket.current.send(JSON.stringify({ msg: 'ping' }))
                }
            }, pingInterval)
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
        connectWebsocket()

        return () => {
            clearInterval(interval.current)
            if (websocket.current.OPEN) {
                websocket.current.close()
            }
        }
    }, [])
}