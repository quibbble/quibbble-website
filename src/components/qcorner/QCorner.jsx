import { useEffect, useRef, useState, useContext } from "react"
import { useLocation } from 'react-router-dom';
import { ThemeContext } from "../../App";
import { QCornerContext } from "./QCornerProvider";

export function QCorner() {

    let name = localStorage.getItem("name")
    const split = name.split(":")
    if (split.length == 2 && split[0] == "quibbble") name = "quibbble"

    const { theme } = useContext(ThemeContext);
    const { qcorner, send } = useContext(QCornerContext);

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: `${animate ? 'smooth' : 'instant'}` }) }
    useEffect(() => { scrollToBottom() }, [qcorner.chat]);

    const { state } = useLocation()
    const animate = !state || !(state?.from.includes('/games') || state?.from.includes('/community') || state?.from.includes('/faq') || state?.from.includes('/profile')) 
    
    const [message, setMessage] = useState("")
    useEffect(() => { setMessage(message.replace(/(\r\n|\n|\r)/gm, ""))}, [message])

    const [showConnections, setShowConnections] = useState(false)

    return (
        <div className={`w-72 h-[43rem] flex flex-col bg-dark-700 rounded-3xl drop-shadow-md ${animate ? 'opacity-0 animate-fade fill-mode-forwards' : ''}`}>
            <div className={`
                flex justify-between items-center w-full p-4 bg-dark-900 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl
                relative before:content-[''] before:absolute before:bottom-[-4rem] before:left-0 before:h-16 before:w-8 before:rounded-tl-3xl before:bg-dark-700 before:shadow-[0_-1rem_0_0_#131313]`}>
                <h1 className={`text-${theme} font-bold text-xl font-lobster`}>
                    Q-Corner
                </h1>
                <div onClick={() => setShowConnections(!showConnections)} className="text-gray text-xs italic relative cursor-pointer hover:underline select-none">
                    {qcorner && qcorner.connection.names ? qcorner.connection.names.length : 0} online
                    {
                        showConnections ? 
                            <div className={`left-[-10rem] text-sm w-48 absolute bg-dark-600 px-4 py-2 mt-2 rounded-md z-50 not-italic drop-shadow-md`}>
                                {
                                    qcorner?.connection?.names?.map((name, i) => <div key={i} className={`font-bold mt-${ i == 0 ? '0' : '1' } ${ name == "quibbble" ? "text-yellow" : "" }`}>{ name }</div>)
                                }
                            </div> : <></>
                    }
                </div>
            </div>
            <div className="flex flex-col overflow-hidden h-full">
                <div className="flex flex-col grow flex-1 h-full relative rounded-3xl px-4 py-2 z-10 overflow-y-scroll no-scrollbar">
                    {
                        qcorner.chat.map((m, i) => 
                            <div key={ i } className={`mb-2 ${name == m.name ? "ml-8 self-end flex flex-col items-end" : "mr-8"}`}>
                                {
                                    i == 0 || (i > 0 && qcorner.chat[i-1].name != m.name) ? 
                                        <div className={`mb-2 text-xs font-bold ${ m.name == "quibbble" ? "text-yellow" : "text-gray" } w-full ${name == m.name ? "text-right" : "text-left"}`}>
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
                    flex w-full h-36 bg-dark-900 rounded-b-3xl rounded-tl-3xl
                    relative before:content-[''] before:absolute before:top-[-4rem] before:right-0 before:h-16 before:w-8 before:rounded-br-3xl before:bg-dark-700 before:shadow-[0_1rem_0_0_#131313]
                `}>
                    <textarea value={message} onChange={ e => {setMessage(e.target.value)} } onKeyDown={ e => {
                        if (e.key === 'Enter' && message.length > 0) {
                            send({type: "chat", details: message}) 
                            setMessage("")
                        }}
                    } maxLength="120" className={`resize-none bg-dark-700 rounded-2xl z-10 grow w-full m-4 p-2 focus:outline focus:outline-2 outline-${theme} text-slate placeholder-gray`} placeholder="type to chat..."/>
                </div>
            </div>
        </div>
    )
}
