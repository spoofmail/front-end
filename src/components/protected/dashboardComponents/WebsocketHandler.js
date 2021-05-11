import React, { useCallback, useContext, useEffect, useRef } from 'react'

import EmailContext from '../../../stores/email-store'
import Websocket from '../../../stores/socket-store'

import Cookies from "universal-cookie";
let cookies = new Cookies();

export default (props) => {
    const context = useContext(EmailContext)

    const websocket = useRef(null)

    const handleNewMessage = useCallback((msg) => {
        const message = JSON.parse(msg.data).finalMessage
        if (message)
            props.addEmail(message)
    }, [context.emailMap, props.addEmail])

    useEffect(() => {
        websocket.current = new WebSocket(`wss://spoofmail-lambda.herokuapp.com/ws?token=${cookies.get("token")}`)
        websocket.current.onopen = () => context.setWebsocketOpen(true)
        websocket.current.onclose = () => console.log("ws closed")

        return () => {
            websocket.current.close()
        };
    }, [])

    useEffect(() => {
        if (!websocket.current) return

        websocket.current.onmessage = handleNewMessage
    })

    return <></>
}