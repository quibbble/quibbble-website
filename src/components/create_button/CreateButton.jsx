import { useState } from 'react';
import { gamedata } from '../../data/games';
import { BsPersonFill } from "react-icons/bs";
import { IoSettingsSharp } from "react-icons/io5";
import { Animation } from "./Animation"

const types = {
    'ai': {
        description: 'Play against the computer in your browser.',
        settings: null
    },
    'multiplayer': {
        description: 'Share a link and play with friends online.',
        settings: {
            async: false
        }
    },
    'local': {
        description: 'Share a device and play against friends locally.',
        settings: null
    }
}

export function CreateButton({game, type}) {
    // todo - generate from server
    const id = 'id'

    const [teams, setTeams] = useState(2)
    const [openTeams, setOpenTeams] = useState(false)

    const [settings, setSettings] = useState(types[type].settings)
    const [openSettings, setOpenSettings] = useState(false)

    return (
        <div className="group flex relative cursor-pointer" state={{ from: location.pathname }}>
            <div className="pointer-events-none absolute text-gray p-8 flex flex-col items-center z-10 h-full">
                <p className={`font-lobster text-4xl text-${gamedata[game].color}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p className='mt-4 grow'>{types[type].description}</p>
                <div className={`self-start flex text-sm pointer-events-auto`}>
                    <div onClick={() => setOpenTeams(open => !open)}>
                        <div className={`flex items-center p-2 rounded-xl hover:outline outline-2 outline-${gamedata[game].color} transition ease-in-out duration-500 bg-${gamedata[game].color} hover:bg-dark-900 text-dark-900 hover:text-${gamedata[game].color}`}>{teams} <BsPersonFill className='text-xl' /></div>
                        { openTeams ? (
                            <ul className={`absolute rounded-lg bg-${gamedata[game].color}`}>
                                {
                                    Array(gamedata[game].maxTeams - gamedata[game].minTeams + 1).fill().map((_, idx) => gamedata[game].minTeams + idx).map(i => 
                                        <li onClick={() => setTeams(i)} key={i} className={`hover:bg-dark-700 text-white hover:text-${gamedata[game].color} w-full py-2 px-4 rounded-md cursor-pointer`}>
                                            {i}
                                        </li>
                                    )
                                }
                            </ul>
                        ) : <></> }
                    </div>
                    
                   { settings ?
                     <div onClick={() => setOpenSettings(open => !open)}>
                        <div className={`ml-2 flex items-center p-2 rounded-xl hover:outline outline-2 outline-${gamedata[game].color} transition ease-in-out duration-500 bg-${gamedata[game].color} hover:bg-dark-900 text-dark-900 hover:text-${gamedata[game].color}`}><IoSettingsSharp className='text-xl' /></div>
                        { openSettings ? (
                            <ul className={`absolute rounded-lg bg-${gamedata[game].color}`}>
                                {
                                    Object.keys(settings).map((k, i) => 
                                        <li onClick={() => {
                                                let updated = {}
                                                updated[k] = !settings[k]
                                                setSettings({...settings, ...updated})
                                            }} key={i} className='py-2 px-4 flex text-white'>
                                            <div>{ k }</div>
                                            <div className='ml-2'>{ settings[k].toString() }</div>
                                        </li>)
                                }
                            </ul>
                        ) : <></> }
                    </div> : <></> }
                </div>
            </div>
            <Animation color={gamedata[game].color} />
        </div>
    )
}
