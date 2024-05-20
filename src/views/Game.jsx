
import { useParams } from 'react-router-dom';
import { useQuibbbleGame } from "../hooks/QuibbbleGame";
import { useContext, useEffect, useRef, useState } from 'react';
import { gamedata } from '../data/games';
import { ThemeContext } from '../App';

export function Game() {

    let { gameKey, gameId } = useParams();

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme(gamedata[gameKey].color), [])

    const [game, send] = useQuibbbleGame({
        host: "apiv2.quibbble.com",
        gameKey: gameKey,
        gameId: gameId
    })

    const id = "Chris"

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
        },
        {
            id: "Dave",
            message: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        }
    ])

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: `smooth` }) }
    useEffect(() => { scrollToBottom() }, [messages]);

    return (
        <div className="flex w-full h-screen">
            <div className='flex flex-col md:flex-row w-full md:grow m-2 lg:m-4'>
                <div className='bg-dark-900 w-full grow md:h-full rounded-3xl mb-2 md:mb-0 mr-0 md:mr-2 lg:mr-4 p-4 mg:p-8'>
                    <p className='text-yellow'>online: {game.online.toString()}</p>
                </div>
                <div className='bg-dark-900 h-64 md:h-full md:w-96 rounded-3xl flex flex-col'>
                    {/* CHAT */}
                    <div className={`
                        flex justify-between items-center w-full p-4 bg-dark-900 rounded-tr-3xl rounded-tl-3xl rounded-br-3xl
                        relative before:content-[''] before:absolute before:bottom-[-4rem] before:left-0 before:h-16 before:w-8 before:rounded-tl-3xl before:bg-dark-700 before:shadow-[0_-1rem_0_0_#131313]`}>
                        <h1 className="text-yellow font-bold text-xl font-lobster">
                            Chat
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
                            flex w-full h-18 md:h-36 bg-dark-900 rounded-b-3xl rounded-tl-3xl
                            relative before:content-[''] before:absolute before:top-[-4rem] before:right-0 before:h-16 before:w-8 before:rounded-br-3xl before:bg-dark-700 before:shadow-[0_1rem_0_0_#131313]
                        `}>
                            <textarea maxLength="120" className="resize-none bg-dark-700 rounded-2xl z-10 grow w-full m-4 p-2 focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray " placeholder="type to chat..."/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
