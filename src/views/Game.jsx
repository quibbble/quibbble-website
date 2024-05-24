
import { Link, useParams } from 'react-router-dom';
import { useQuibbbleGame } from "../hooks/QuibbbleGame";
import { createRef, useContext, useEffect, useRef, useState } from 'react';
import { gamedata } from '../data/games';
import { ThemeContext } from '../App';
import { Chat } from './game/Chat';
import { Connect4 } from './game/games/Connect4';

const games = {
    connect4: (ref, game, send) => <Connect4 ref={ ref } game={ game } send={ send } />
}

export function Game() {

    let { gameKey, gameId } = useParams();

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme(gamedata[gameKey].color), [])

    const [game, send] = useQuibbbleGame({
        host: "apiv2.quibbble.com",
        gameKey: gameKey,
        gameId: gameId
    })

    const ref = createRef();

    const message = game && game.snapshot ? game.snapshot.winners?.length > 0 ? `${ game.snapshot.winners } wins` : `${ game.snapshot.turn } turn` : ""

    return (
        <div className="flex w-full h-screen">
            <div className='flex flex-col md:flex-row w-full md:grow m-2 lg:m-4'>
                <div ref={ ref } className='relative bg-dark-900 w-full grow md:h-full rounded-3xl mb-2 md:mb-0 mr-0 md:mr-2 lg:mr-4 p-4 mg:p-8'>
                    <div className='absolute top-4 md:top-auto md:bottom-8 left-4 md:left-6 '>
                        <Link to={'/'} state={{ from: location.pathname }} className={`font-lobster text-slate text-2xl md:text-3xl cursor-pointer`}>quibbble</Link>
                    </div>
                    <div className='absolute top-4 md:top-auto md:bottom-8 right-4 md:right-6 '>
                        <div className={`text-lg md:text-xl font-bold text-${game && game.snapshot ? game.snapshot.turn : "slate"}`}>{ message }</div>
                    </div>
                    { games[gameKey](ref, game, send) }
                </div>
                <Chat gameKey={ gameKey } gameId={ gameId } game={ game } send={ send } />
            </div>
        </div>
    )
}
