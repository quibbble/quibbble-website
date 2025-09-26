import { useState } from 'react';
import { gamedata } from '../../data/games';
import { BsPersonFill } from "react-icons/bs";
import { Animation } from "./Animation"
import { createGame } from '../../services/quibbble';
import { useNavigate } from 'react-router-dom';
import { CreateID } from '../../utils/id';

const kinds = {
    'ai': {
        description: 'Play against the computer in your browser.',
    },
    'multiplayer': {
        description: 'Share a link and play with friends online.',
    },
    'local': {
        description: 'Share a device and play against friends locally.',
    }
}

export function CreateButton({gameKey, kind}) {

    const navigate = useNavigate()

    const [teams, setTeams] = useState(2)
    const [variant, setVariant] = useState(gamedata[gameKey].variants ? gamedata[gameKey].variants[0] : null)
    const [disable, setDisable] = useState(false)

    const handlePlay = async e => {
        if (disable) return
        setDisable(true)
        e.preventDefault()
        const gameId = CreateID()
        let resp = await createGame(gameKey, gameId, teams, variant, kind)
        if (resp.status == 201) navigate(`/play/${ gameKey }/${ gameId }`)
        else navigate("/error")
    }

    const handleTeams = e => {
        e.preventDefault()
        e.stopPropagation()
        setTeams(teams => teams+1 > gamedata[gameKey].maxTeams ? gamedata[gameKey].minTeams : teams+1)
    }

    const handleVariants = e => {
        e.preventDefault()
        e.stopPropagation()
        if (variant) {
            let idx = gamedata[gameKey].variants.indexOf(variant)
            let next = (idx + 1) % gamedata[gameKey].variants.length
            setVariant(gamedata[gameKey].variants[next])
        }
    }

    return (
        <div onClick={ handlePlay } className="relative flex cursor-pointer group">
            <div className="absolute z-50 flex flex-col items-center h-full p-8 pointer-events-none text-gray">
                <h1 className={`font-lobster text-4xl text-${gamedata[gameKey].color}`}>{kind.charAt(0).toUpperCase() + kind.slice(1)}</h1>
                <p className='mt-4 grow'>{kinds[kind].description}</p>
                <div className='flex self-start'>
                    <div className={`self-end flex text-sm pointer-events-auto cursor-pointer`}>
                        <div onClick={ handleTeams }>
                            <div className={`flex items-center p-2 rounded-xl hover:outline outline-2 outline-${gamedata[gameKey].color} transition ease-in-out duration-500 bg-${gamedata[gameKey].color} hover:bg-dark-900 text-dark-900 hover:text-${gamedata[gameKey].color}`}>{teams} <BsPersonFill className='text-xl' /></div>
                        </div>
                    </div>
                    {
                        variant ? 
                            <div className={`ml-2 max-w-16 self-start flex text-sm pointer-events-auto cursor-pointer`}>
                                <div onClick={ handleVariants }>
                                    <div className={`flex font-black items-center p-2 rounded-xl hover:outline outline-2 outline-${gamedata[gameKey].color} transition ease-in-out duration-500 bg-${gamedata[gameKey].color} hover:bg-dark-900 text-dark-900 hover:text-${gamedata[gameKey].color}`}>{variant.replace("_", " ")}</div>
                                </div>
                            </div> : null
                    }
                </div>
            </div>
            <Animation color={gamedata[gameKey].color} />
        </div>
    )
}
