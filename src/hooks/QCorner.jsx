import { useEffect, useRef, useState, useCallback } from "react";

const host = import.meta.env.VITE_QUIBBBLE_HOST

export function useQCorner() {

    const name = localStorage.getItem("name")

    const ws = useRef()
    const [reconnecting, setReconnecting] = useState(false);
    const [qcorner, setQCorner] = useState({
        online: false,
        connection: {},
        chat: []
    })

    useEffect(() => {
        async function connect() {
            if (reconnecting) return
            if (!ws.current) {
                let url = `wss://${host}/qcorner?name=${name}`
                const client = new WebSocket(url)
                ws.current = client
    
                client.onopen = () => setQCorner(((p) => { return({ ...p, online: true, chat: [] }) }))
    
                client.onerror = e => console.error(e)
    
                client.onmessage = e => {
                    let msg = JSON.parse(e.data)
                    if (msg.type === "connection") setQCorner(((p) => { return({ ...p, connection: msg.details }) }))
                    else if (msg.type === "chat") setQCorner(((p) => { return({ ...p, chat: p.chat.concat([msg.details]) }) }))
                    else if (msg.type === "pong") console.debug("pong")
                }
    
                client.onclose = () => {
                    if (!ws.current || reconnecting) return
                    setQCorner(((p) => { return({ ...p, online: false }) }))
                    setReconnecting(true)
                    setTimeout(() => setReconnecting(false), 3000)
                }
            }
        }
        connect()
        return () => {
            if (ws.current) ws.current.close()
            ws.current = null
        }
    }, [reconnecting])

    const send = useCallback((msg) => {
        if (!ws.current) return
        ws.current.send(JSON.stringify(msg))
     }, [ws])

     useEffect(() => {
        // send ping every 30s to keep connection alive
        setInterval(() => { send({type: "ping"}) }, 30000)
    }, [])

    return [qcorner, send]
}
