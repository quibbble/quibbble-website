import { useEffect, useRef, useState } from "react"
import { useLocation } from 'react-router-dom';

export function QCorner() {

    const [messages, setMessages] = useState([
        {
            id: "John",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: "Jackson",
            message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "Chris",
            message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "John",
            message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
            id: "Dave",
            message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ])

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: `${animate ? 'smooth' : 'instant'}` }) }
    useEffect(() => { scrollToBottom() }, [messages]);

    const id = "Chris"

    const { state } = useLocation()
    const animate = !state || !(state?.from.includes('/games') || state?.from.includes('/community') || state?.from.includes('/faq'))

    return (
        <div className={`w-72 h-[43rem] flex flex-col bg-dark-700 rounded-3xl drop-shadow-md ${animate ? 'opacity-0 animate-fade fill-mode-forwards' : ''}`}>
            <div className={`
                flex justify-between items-center w-full p-4 bg-dark-900 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl
                relative before:content-[''] before:absolute before:bottom-[-4rem] before:left-0 before:h-16 before:w-8 before:rounded-tl-3xl before:bg-dark-700 before:shadow-[0_-1rem_0_0_#131313]`}>
                <h1 className="text-yellow font-bold text-xl font-lobster">
                    Q-Corner
                </h1>
                <div className="text-gray text-xs italic">4 online</div>
            </div>
            <div className="flex flex-col overflow-hidden">
                <div className="flex flex-col flex-1 h-full relative rounded-3xl px-4 py-2 z-10 overflow-y-scroll no-scrollbar">
                    {
                        messages.map((m, i) => 
                            <div key={ i } className={`mb-2 ${id == m.id ? "ml-8" : "mr-8"}`}>
                                <div className={`text-xs text-gray w-full ${id == m.id ? "text-right" : "text-left"}`}>
                                    { m.id }
                                </div>
                                <div className={`mt-1 p-4 rounded-2xl ${id == m.id ? "bg-yellow text-dark-900" : "bg-dark-600 text-slate"} text-xs`}>
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
                    <textarea maxLength="120" className="resize-none bg-dark-700 rounded-2xl z-10 grow w-full m-4 p-2 focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray " placeholder="type to chat..."/>
                </div>
            </div>
        </div>
    )
}
