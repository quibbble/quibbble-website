import { Navbar } from "../components/navbar/Navbar";
import { useParams } from 'react-router-dom';
import { gamedata } from "../data/games";
import { BsPersonFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa";
import { QCorner } from "../components/qcorner/QCorner";
import { CreateButton } from "../components/create_button/CreateButton";

export function GameInfo() {

    let { gameKey } = useParams();

    return (
        <div className="flex flex-col items-center m-8">
            <div className="flex flex-col items-center w-full max-w-6xl">
                <Navbar />
                <div className="flex flex-col items-center w-full">
                    <div className="flex mt-4 md:mt-8 w-full">
                        <span className="hidden lg:flex"> 
                            <QCorner />
                        </span>
                        <div className="md:ml-4 w-full flex flex-col">
                            <Banner game={ gameKey } />
                            <div className="mt-2 md:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[100ms]">
                                    <CreateButton game={gameKey} type={'ai'} />
                                </span>
                                <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[200ms]">
                                    <CreateButton game={gameKey} type={'multiplayer'} />
                                </span>
                                <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[300ms]">
                                    <CreateButton game={gameKey} type={'local'} />
                                </span>
                            </div>
                            {/* <div className="hidden md:flex mt-2 md:mt-4 grow bg-dark-900 rounded-3xl p-8 text-gray">
                                TODO
                            </div> */}
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

    return (
        <div className="flex flex-wrap-reverse justify-between items-center w-full bg-dark-900 p-8 rounded-3xl opacity-0 animate-fade fill-mode-forwards drop-shadow-md">
            <div className="flex md:flex-col text-xs md:text-sm text-gray">
                <p className="mr-2 mb-4 md:mb-0"><span className={`font-bold text-${gamedata[game].color}`}>4</span> Live Games</p>
                <p><span className={`font-bold text-${gamedata[game].color}`}>12</span> Active Players</p>
            </div>
            <div className="flex text-gray">
                <p className="flex items-center text-xs md:text-sm">{ gamedata[game].minTeams == gamedata[game].maxTeams ? `${gamedata[game].minTeams }` : `${gamedata[game].minTeams }-${ gamedata[game].maxTeams}` } <BsPersonFill className="ml-1 text-xl" /></p>
                <p className="flex items-center m-4 md:mx-8 md:my-0 text-xs md:text-sm">{ gamedata[game].minTime }-{ gamedata[game].maxTime } <BiTimeFive className="ml-1 text-xl" /></p>
                <p className="flex items-center text-xs md:text-sm">{complexity[gamedata[game].complexity]} <FaDumbbell className="ml-1 text-xl" /></p>
            </div>
            <div className={`font-lobster text-${gamedata[game].color} text-4xl`}>
                { game.charAt(0).toUpperCase() + game.slice(1) }
            </div>
        </div>
    )
}
