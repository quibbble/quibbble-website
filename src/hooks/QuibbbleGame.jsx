import { useEffect, useRef, useState, useCallback } from "react";

export function useQuibbbleGame({ host, gameKey, gameId }) {

    const name = localStorage.getItem("name")

    const ws = useRef()
    const [reconnecting, setReconnecting] = useState(false)
    const [game, setGame] = useState({
        online: false,
        snapshot: {},
        connection: {},
        error: {},
        chat: []
    })

    useEffect(() => {
        async function connect() {
            if (reconnecting) return
            if (!ws.current) {

                const client = new WebSocket(`wss://${ host }/game/${ gameKey }/${ gameId }?name=${name}`)
                ws.current = client
    
                client.onopen = () => setGame(((p) => { return({ ...p, online: true, chat: [] }) }))
    
                client.onerror = e => console.error(e)
    
                client.onmessage = e => {
                    let msg = JSON.parse(e.data)
                    if (msg.type === "snapshot") setGame(((p) => { return({ ...p, snapshot: msg.details }) }))
                    else if (msg.type === "connection") setGame(((p) => { return({ ...p, connection: msg.details }) }))
                    else if (msg.type === "error") setGame(((p) => { return({ ...p, error: msg.details }) }))
                    else if (msg.type === "chat") setGame(((p) => { return({ ...p, chat: p.chat.concat([msg.details]) }) }))
                    else if (msg.type === "pong") console.debug("pong")
                }
    
                client.onclose = () => {
                    if (!ws.current || reconnecting) return
                    setGame(((p) => { return({ ...p, online: false }) }))
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

    return [game, send]
}
