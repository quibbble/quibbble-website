import { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "../../App";

export function Chat({ gameKey, gameId, game, send }) {

    const { theme } = useContext(ThemeContext);

    const name = localStorage.getItem("name")

    const [message, setMessage] = useState("")
    useEffect(() => { setMessage(message.replace(/(\r\n|\n|\r)/gm, ""))}, [message])

    const [showConnections, setShowConnections] = useState(false)

    const [messages, setMessages] = useState([
        {
            name: "qbot",
            message: <p className="">Welcome! If you need anything please type <span className="text-yellow">/help</span>.</p>
        }
    ])

    useEffect(() => {
        if (game.error) setMessages(m => { return m.concat({
            name: "qbot",
            message: <p><span className="font-bold text-red">Error</span> { game.error }</p>
        })})
    }, [game.error])

    const [kind, setKind] = useState()
    useEffect(() => {
        if (game.snapshot && game.snapshot.kind && game.snapshot.kind != kind) setKind(game.snapshot.kind)
    }, [game.snapshot])

    const [turn, setTurn] = useState()
    useEffect(() => {
        if (game.snapshot && game.snapshot.turn && game.snapshot.turn != turn) setTurn(game.snapshot.turn)
    }, [game.snapshot])

    useEffect(() => {
        if (kind) {
            if (kind == "multiplayer") {
                let msgs = [
                    {
                        name: "qbot",
                        message: <div>Please share this link to play with others <CopyText text={ window.location.href } /></div>
                    },
                    {
                        name: "qbot",
                        message: <p className="">Please select a team</p>
                    }
                ]
                for (let color of game.snapshot.teams) {
                    msgs.push({
                        name: "qbot",
                        message: <p onClick={ () => sendJoin(color) } className={`text-base text-${ color } cursor-pointer`}>{ color }</p>
                    })
                }
                setMessages(m => { return m.concat(msgs)})
            }
            else if (kind == "ai") {
                let msgs = [
                    {
                        name: "qbot",
                        message: <div>This is a single player game against the AI.</div>
                    },
                ]
                setMessages(m => { return m.concat(msgs)})
                sendJoin("red")
            }
            else if (kind == "local") {
                let msgs = [
                    {
                        name: "qbot",
                        message: <div>This is a local game.</div>
                    },
                ]
                setMessages(m => { return m.concat(msgs)})
            }
        }
    }, [kind])

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: `smooth` }) }
    useEffect(() => { scrollToBottom() }, [messages]);

    useEffect(() => {
        if (game.chat.length > 0) setMessages((m) => { return m.concat([game.chat[game.chat.length-1]]) })
    }, [game.chat])

    const sendJoin = (team) => { send({"type": "join", "details": team}) }
    const sendUndo = () => { send({"type": "undo"}) }
    const sendReset = () => { send({"type": "reset"}) }
    const sendAi = () => { send({"type": "ai"}) }

    const [team, setTeam] = useState("")
    const [connection, setConnection] = useState({})

    useEffect(() => {
        if (game.online) {
            let team = localStorage.getItem(`${ gameKey }-${ gameId }`)
            if (team) sendJoin(team)
        }
    }, [game.online])

    useEffect(() => {
        if (game.connection) {
            setTeam(game.connection[name])
            for (let n of Object.keys(game.connection)) {
                if (n != name && connection[n] != game.connection[n]) {
                    let msg = {
                        name: "qbot",
                        message: <p className=""><span className={`text-${ game.connection[n] }`}>{ n }</span> has joined team <span className={`text-${ game.connection[n] }`}>{ game.connection[n] }</span>!</p>
                    }
                    setMessages((m) => { return m.concat([msg]) })
                }
            }
            setConnection(game.connection)
        }
    }, [game.connection])

    useEffect(() => {
        localStorage.setItem(`${ gameKey }-${ gameId }`, team)
        if (team) {
            let msg = {
                name: "qbot",
                message: <p className="">You have joined team <span className={`text-${ team }`}>{ team }</span>!</p>
            }
            setMessages((m) => { return m.concat([msg]) })
        }
    }, [team])

    useEffect(() => {
        if (kind == "ai") {
            if (team && turn != team) sendAi()
        } else if (kind == "local") {
            if (team && turn != team) {
                sendJoin("") // clear the team to prevent teams from seeing each others game states
            } else if (!team) {
                let msgs = [
                    {
                        name: "qbot",
                        message: <p className="cursor-pointer text-yellow" onClick={ () => { sendJoin(game.snapshot.turn) }}>It's now <span className={`text-${ game.snapshot.turn }`}>{ game.snapshot.turn }</span>'s turn. Pass the device and then click this message when ready to play for <span className={`text-${ game.snapshot.turn }`}>{ game.snapshot.turn }</span>.</p>
                    }
                ]
                setMessages(m => { return m.concat(msgs)})
            }
        }
    }, [kind, team, turn])

    useEffect(() => {
        setTimeout(() => { // kind of a hack to show this message last on page reload ang game is over
            if (game.snapshot && game.snapshot.winners && game.snapshot.winners.length > 0) {
                let msgs = [
                    {
                        name: "qbot",
                        message: <div className="text-yellow">{ game.snapshot.winners.map((team, i) => <><span className={`text-${team}`}>{ team }</span>{ i == game.snapshot.winners.length - 1 ? "" : "," } </>) } { game.snapshot.winners.length > 1 ? "all tied!" : "has won the game!" }</div>
                    },
                    {
                        name: "qbot",
                        message: <div className="text-yellow cursor-pointer" onClick={() => { sendReset() }}>Click on this message to reset and play again!</div>
                    }
                ]
                setMessages(m => { return m.concat(msgs)})
            }
        }, 50)
    }, [game.snapshot])

    return (
        <div className='bg-dark-900 h-64 md:h-full md:w-96 rounded-3xl flex flex-col'>
            <div className={`
                flex justify-between items-center w-full p-4 bg-dark-900 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl
                relative before:content-[''] before:absolute before:bottom-[-4rem] before:left-0 before:h-16 before:w-8 before:rounded-tl-3xl before:bg-dark-700 before:shadow-[0_-1rem_0_0_#131313]`}>
                <h1 className="text-gray font-bold text-xl font-lobster">
                    <span className={`text-${ theme }`}>Chat</span>
                </h1>
                <div onClick={() => setShowConnections(!showConnections)} className="text-gray text-xs italic relative cursor-pointer hover:underline select-none">
                    {game && game.connection ? Object.keys(game.connection).length : 0} online
                    {
                        showConnections ? 
                            <div className={`left-[-10rem] text-sm w-48 absolute bg-dark-600 px-4 py-2 mt-2 rounded-md z-50 not-italic drop-shadow-md`}>
                                {
                                   game && game.connection ? Object.keys(game.connection).map((name, i) => <div key={i} className={`font-bold mt-${ i == 0 ? '0' : '1' } text-${game.connection[name] ? game.connection[name] : "slate"}`}>{ name }</div>) : null
                                }
                            </div> : <></>
                    }
                </div>
            </div>
            <div className="flex flex-col flex-grow overflow-hidden">
                <div className="flex flex-col bg-dark-700 flex-1 h-full relative rounded-3xl px-4 py-2 z-10 overflow-y-scroll no-scrollbar">
                    {
                        messages.map((m, i) => 
                            <div key={ i } className={`mb-2 ${name == m.name ? "ml-8 self-end flex flex-col items-end" : "mr-8"}`}>
                                {
                                    i == 0 || (i > 0 && messages[i-1].name != m.name) ? 
                                        <div className={`mb-2 text-xs font-bold text-${ game.connection && game.connection[m.name] ? game.connection[m.name] : "gray" } w-full ${name == m.name ? "text-right" : "text-left"}`}>
                                            { m.name }
                                        </div> : <></>
                                }
                                <div className={`px-3 py-2 w-fit max-w-96 md:max-w-48 text-pretty break-words rounded-2xl ${name == m.name ? `bg-${theme} text-dark-900` : "bg-dark-600 text-slate"} text-xs font-bold`}>
                                    { m.message }
                                </div>
                            </div>
                        )
                    }
                    <div ref={messagesEndRef} />
                </div>
                <div className={`
                    flex w-full h-18 md:h-36 bg-dark-900 rounded-b-3xl rounded-tl-3xl
                    relative before:content-[''] before:absolute before:top-[-4rem] before:right-0 before:h-16 before:w-8 before:rounded-br-3xl before:bg-dark-700 before:shadow-[0_1rem_0_0_#131313]
                `}>
                    <textarea value={message} onChange={ e => {setMessage(e.target.value)} } onKeyDown={ e => {
                        if (e.key === 'Enter' && message.length > 0) {
                            if (message[0] == "/") {
                                let msg = {
                                    name: name,
                                    message: message
                                }
                                setMessages((m) => { return m.concat([msg]) })
                                if (message == "/help") {
                                    let msgs = [
                                        {
                                            name: "qbot",
                                            message: "Here is a list of helpful commands!"
                                        },
                                        {
                                            name: "qbot",
                                            message: <p><span className="text-yellow">/join</span> <span className="text-yellow opacity-75">team</span> may be used to join a different team.</p>
                                        },
                                        {
                                            name: "qbot",
                                            message: <p><span className="text-yellow">/undo</span> may be used to undo your last action.</p>
                                        },
                                        {
                                            name: "qbot",
                                            message: <p><span className="text-yellow">/reset</span> may be used to completely reset the game.</p>
                                        },
                                        {
                                            name: "qbot",
                                            message: <p><span className="text-yellow">/ai</span> may be used to play an ai action.</p>
                                        }
                                    ]
                                    setMessages((m) => { return m.concat(msgs) })
                                } 
                                else if (message == "/undo") sendUndo()
                                else if (message == "/reset") sendReset()
                                else if (message == "/ai") sendAi()
                                else if (message.split(" ")[0] == "/join") {
                                    sendJoin(message.split(" ")[1])
                                }
                            } else {
                                send({type: "chat", details: message})
                            }
                            setMessage("")
                        }}
                    } maxLength="120" className="resize-none bg-dark-700 rounded-2xl z-10 grow w-full m-4 p-2 focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray " placeholder="type to chat..."/>
                </div>
            </div>
        </div>
    )
}

function CopyText({ text }) {
    const [copy, setCopy] = useState(false);
    useEffect(() => { 
        if (copy) setTimeout(() => setCopy(false), 1000) 
    }, [copy]);

    return (
        <div className="relative text-yellow cursor-pointer underline" onClick={() => {
            setCopy(true);
            navigator.clipboard.writeText(text)
         }}><p>{ text }</p>
            {
                copy ?
                    <div className="absolute mt-2 w-6/12 flex justify-center">
                        <div className="absolute top-[-12px] w-6 overflow-hidden inline-block">
                            <div className=" h-4 w-4 bg-dark-900 rotate-45 transform origin-bottom-left" />
                        </div>
                        <div className="text-slate font-bold text-xs text-center bg-dark-900 p-2 rounded-md">copied!</div>
                    </div> : <></>
            }
         </div>
    )
}
