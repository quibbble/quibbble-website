
import { Link, useParams } from 'react-router-dom';
import { useQuibbbleGame } from "../hooks/QuibbbleGame";
import { createRef, useContext, useEffect, useState } from 'react';
import { gamedata } from '../data/games';
import { ThemeContext } from '../App';
import { Chat } from './game/Chat';
import { Connect4 } from './game/games/connect4/Connect4';
import { Carcassonne } from './game/games/carcassonne/Carcassonne';
import { Tsuro } from './game/games/tsuro/Tsuro';
import { TicTacToe } from './game/games/tictactoe/TicTacToe';
import { Indigo } from './game/games/indigo/Indigo';
import { Stratego } from './game/games/stratego/Stratego';
import { loadGame } from "../services/quibbble";

const games = {
    carcassonne: (ref, game, send) => <Carcassonne ref={ ref } game={ game } send={ send } />,
    connect4: (ref, game, send) => <Connect4 ref={ ref } game={ game } send={ send } />,
    indigo: (ref, game, send) => <Indigo ref={ ref } game={ game } send={ send } />,
    stratego: (ref, game, send) => <Stratego ref={ ref } game={ game } send={ send } />,
    tsuro: (ref, game, send) => <Tsuro ref={ ref } game={ game } send={ send } />,
    tictactoe: (ref, game, send) => <TicTacToe ref={ ref } game={ game } send={ send } />,
}

export function Game() {

    let name = localStorage.getItem("name")
    const split = name.split(":")
    if (split.length == 2 && split[0] == "quibbble") name = "quibbble"

    let { gameKey, gameId } = useParams();

    const { theme, setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme(gamedata[gameKey].color), [])

    const [found, setFound] = useState(true) 
    useEffect(() => {
        const f = async () => {
            const resp = await loadGame(gameKey, gameId)
            if (resp.status != 200) {
                setFound(false)
            }
        }
        f()
    }, [])

    const [game, send] = useQuibbbleGame({
        host: "apiv2.quibbble.com",
        gameKey: gameKey,
        gameId: gameId
    })

    const [team, setTeam] = useState("")
    useEffect(() => { if (game.connection) setTeam(game.connection[name]) }, [game.connection])

    const ref = createRef();

    return (
        game.online ? 
            <div className="flex w-full h-screen">
                <div className='flex flex-col md:flex-row w-full md:grow m-2 lg:m-4 opacity-0 animate-fade fill-mode-forwards'>
                    <div ref={ ref } className='relative bg-dark-900 w-full grow md:h-full rounded-3xl mb-2 md:mb-0 mr-0 md:mr-2 lg:mr-4 p-4 mg:p-8'>
                        <div className='absolute top-4 md:top-auto md:bottom-8 left-4 md:left-6 z-50'>
                            <Link to={'/'} state={{ from: location.pathname }} className={`font-lobster ${ team ? `text-${ team }` : "text-slate" } text-2xl lg:text-3xl cursor-pointer`}>quibbble</Link>
                        </div>
                        <div className='absolute top-4 md:top-auto md:bottom-8 right-4 md:right-6 '>
                            <Turns teams={ game.snapshot.teams ? game.snapshot.teams : [] } turn={ game.snapshot.turn ? game.snapshot.turn : "" } winners={ game.snapshot.winners ? game.snapshot.winners : [] } />
                        </div>
                        { games[gameKey](ref, game, send) }
                    </div>
                    <Chat gameKey={ gameKey } gameId={ gameId } game={ game } send={ send } />
                </div>
            </div> : 
            <div className="flex flex-col w-full h-screen items-center justify-center opacity-0 animate-fade fill-mode-forwards">
                <div className="flex flex-col items-center justify-center p-8 bg-dark-900 rounded-3xl">
                    <h1 className={`text-white font-lobster mb-4 text-3xl drop-shadow-m`}>{ found ? "Loading your game!" : "Game not found"}</h1>
                    <div className="flex mb-4">
                        <div className={`loader text-${ theme } m-[1.66rem] ${ !found ? "!animate-none" : "" }`}></div>
                        <div className={`loader text-${ theme } m-[1.66rem] ${ !found ? "!animate-none" : "" }`}></div>
                        <div className={`loader text-${ theme } m-[1.66rem] ${ !found ? "!animate-none" : "" }`}></div>
                        <div className={`loader text-${ theme } m-[1.66rem] ${ !found ? "!animate-none" : "" }`}></div>
                        <div className={`loader text-${ theme } m-[1.66rem] ${ !found ? "!animate-none" : "" }`}></div>
                    </div>
                    <Link className="group mt-4 font-bold flex items-center justify-center" to={`/games/${ gameKey }`} state={{ from: location.pathname }} >
                        <svg className="fill-slate ml-2 transition ease-in-out duration-500 group-hover:-translate-x-2" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path transform="translate(19), scale(-1,1)" d="M18.7273 8.34814C18.7413 8.23663 18.7413 8.1238 18.7273 8.01229V7.93168C18.7267 7.78905 18.6993 7.64779 18.6467 7.51522C18.5909 7.36441 18.5039 7.22707 18.3914 7.1122L11.6743 0.39509C11.4214 0.142118 11.0783 0 10.7205 0C10.3627 0 10.0196 0.142118 9.76667 0.39509C9.5137 0.648061 9.37158 0.991164 9.37158 1.34892C9.37158 1.70667 9.5137 2.04978 9.76667 2.30275L14.2268 6.58826L1.34342 6.58826C0.987124 6.58826 0.64542 6.7298 0.393479 6.98174C0.141539 7.23368 0 7.57539 0 7.93168C0 8.28798 0.141539 8.62969 0.393479 8.88163C0.64542 9.13357 0.987124 9.2751 1.34342 9.2751L14.2268 9.2751L9.79354 13.695C9.66763 13.8199 9.56768 13.9684 9.49948 14.1321C9.43127 14.2958 9.39616 14.4714 9.39616 14.6488C9.39616 14.8261 9.43127 15.0017 9.49948 15.1654C9.56768 15.3291 9.66763 15.4777 9.79354 15.6026C9.91843 15.7285 10.067 15.8285 10.2307 15.8967C10.3944 15.9649 10.57 16 10.7474 16C10.9247 16 11.1003 15.9649 11.264 15.8967C11.4277 15.8285 11.5763 15.7285 11.7012 15.6026L18.4183 8.88551C18.5267 8.76747 18.6132 8.63098 18.6736 8.48249C18.6994 8.44131 18.7176 8.3958 18.7273 8.34814Z"/>
                        </svg>
                        <p className="ml-1 text-slate">go back</p>
                    </Link>
                </div>
            </div> 
    )
}

import { FaCrown } from "react-icons/fa6";

function Turns({ teams, turn, winners }) {

    const title = winners.length > 0 ? 
        `${ winners.map((team, i) => { return `${ team }${ i == winners.length - 1 ? "" : ", " }` }) } ${ winners.length > 1 ? "have tied!" : "has won the game!" }` :
        `${ turn }'s turn to play!`

    return (
        <div className={`flex p-1 rounded-full`} title={ title }>
            {
                teams.map((team, i) => 
                    <div key={ i } className={`${ i == teams.length-1 ? "" : "mr-1" } flex items-center`}>
                        <div className={`${ (winners.length > 0 && winners.includes(team)) || (winners.length == 0 && team == turn) ? "opacity-100 animate-bounce" : "opacity-20" } bg-${ team } w-5 lg:w-7 h-5 lg:h-7 rounded-full flex items-center justify-center`}>
                            {
                                winners.includes(team) ? 
                                    <FaCrown className='lg:text-xl fill-white' /> : <></>
                            }
                        </div>
                    </div>
            )
            }
        </div>
    )
}
