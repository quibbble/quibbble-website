import { useEffect, useRef, useState, useCallback } from "react";

export function useQuibbbleGame({ host, gameKey, gameId }) {

    const ws = useRef()
    const [reconnecting, setReconnecting] = useState(false);
    const [game, setGame] = useState({
        online: false,
        snapshot: {},
        connection: {},
        error: {},
        chat: []
    })

    useEffect(() => {
        if (reconnecting) return
        if (!ws.current) {
            const client = new WebSocket(`wss://${ host }/${ gameKey }/${ gameId }/connect`)
            ws.current = client

            client.onopen = () => setGame(((p) => { return({ ...p, online: true }) }))

            client.onerror = e => console.error(e)

            client.onmessage = e => {
                let msg = JSON.parse(e.data)
                if (msg.type === "snapshot") setGame(((p) => { return({ ...p, snapshot: msg.details }) }))
                else if (msg.type === "connection") setGame(((p) => { return({ ...p, connection: msg.details }) }))
                else if (msg.type === "error") setGame(((p) => { return({ ...p, error: msg.details }) }))
                else if (msg.type === "chat") setGame(((p) => { return({ ...p, chat: game.chat.concat([msg.details]) }) }))
            }

            client.onclose = () => {
                if (!ws.current || reconnecting) return
                setGame(((p) => { return({ ...p, online: false }) }))
                setReconnecting(true)
                setTimeout(() => setReconnecting(false), 5000)
            }
        }

        return () => {
            if (ws.current) ws.current.close()
            ws.current = null
        }
    }, [reconnecting])

    const send = useCallback((msg) => {
        if (!ws.current) return
        ws.current.send(JSON.stringify(msg))
     }, [ws])

    return [game, send]
}
