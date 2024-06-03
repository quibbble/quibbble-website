import { Navbar } from "../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import { gamedata } from "../data/games";
import { BsPersonFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa";
import { QCorner } from "../components/qcorner/QCorner";
import { CreateButton } from "../components/create_button/CreateButton";
import { useContext, useEffect } from "react";
import { ActivityContext, ThemeContext } from "../App";

export function GameInfo() {

    let { gameKey } = useParams();

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme(gamedata[gameKey].color), [])

    return (
        <div className="flex flex-col items-center m-8">
            <div className="flex flex-col items-center w-full max-w-6xl">
                <Navbar />
                <div className="flex flex-col items-center w-full">
                    <div className="flex w-full mt-4 md:mt-8">
                        <span className="hidden lg:flex"> 
                            <QCorner />
                        </span>
                        <div className="flex flex-col w-full md:ml-4">
                            <Banner game={ gameKey } />
                            <div className="grid grid-cols-1 gap-3 mt-2 md:mt-4 sm:grid-cols-3">
                                <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[100ms]">
                                    <CreateButton gameKey={gameKey} kind={'ai'} />
                                </span>
                                <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[200ms]">
                                    <CreateButton gameKey={gameKey} kind={'multiplayer'} />
                                </span>
                                <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[300ms]">
                                    <CreateButton gameKey={gameKey} kind={'local'} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    )
}

function Banner({ game }) {

    const complexity = {
        0: "easy",
        1: "medium",
        2: "hard"
    }

    const { activity } = useContext(ActivityContext);

    return (
        <div className="flex flex-wrap-reverse items-center justify-between w-full p-8 opacity-0 bg-dark-900 rounded-3xl animate-fade fill-mode-forwards drop-shadow-md">
            <div className="flex text-xs md:flex-col md:text-sm text-gray">
                <p className="mb-4 mr-2 md:mb-0"><span className={`font-bold text-${gamedata[game].color}`}>{ activity?.live_game_count[game] }</span> Live Games</p>
                <p><span className={`font-bold text-${gamedata[game].color}`}>{ activity?.live_player_count[game] }</span> Active Players</p>
            </div>
            <div className="flex text-gray">
                <p className="flex items-center text-xs md:text-sm">{ gamedata[game].minTeams == gamedata[game].maxTeams ? `${gamedata[game].minTeams }` : `${gamedata[game].minTeams }-${ gamedata[game].maxTeams}` } <BsPersonFill className="ml-1 text-xl" /></p>
                <p className="flex items-center m-4 text-xs md:mx-8 md:my-0 md:text-sm">{ gamedata[game].minTime }-{ gamedata[game].maxTime } <BiTimeFive className="ml-1 text-xl" /></p>
                <p className="flex items-center text-xs md:text-sm">{complexity[gamedata[game].complexity]} <FaDumbbell className="ml-1 text-xl" /></p>
            </div>
            <div className={`font-lobster text-${gamedata[game].color} text-4xl`}>
                { game.charAt(0).toUpperCase() + game.slice(1) }
            </div>
        </div>
    )
}
