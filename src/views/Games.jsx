import { Navbar } from "../components/navbar/Navbar";
import { GameButton } from "../components/game_button/GameButton";
import { useEffect, useState } from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

const games = [
  { game: 'carcassonne', color: 'orange' },
  { game: 'connect4', color: 'yellow' },
  { game: 'tsuro', color: 'red' },
  { game: 'tictactoe', color: 'turquoise' },
  { game: 'indigo', color: 'indigo' },
  { game: 'stratego', color: 'sky' },
  { game: 'azul', color: 'pink' },
  { game: 'battleship', color: 'blue' },
  { game: 'blockus', color: 'green' },
  { game: 'codenames', color: 'magenta' },
  { game: 'hive', color: 'lime' },
  { game: 'qwirkle', color: 'purple' },
]

export function Games({ qcorner }) {

  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(games)
  useEffect(() => { setFiltered(games.filter(g => g.game.includes(search.toLowerCase()))) }, [search])

  return (
    <div className="flex flex-col items-center m-8">
      <div className="flex flex-col items-center w-full max-w-6xl">
        <Navbar />
        <div className="flex flex-col items-center w-full">
          <div className="flex mt-4 md:mt-8 w-full">
            <span className="hidden lg:flex opacity-0 animate-fade fill-mode-forwards">
              { qcorner }
            </span>
            <div className="md:ml-4 w-full flex flex-col">
              <input type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} className="self-end bg-dark-900 w-full font-bold md:max-w-64 rounded-full focus:outline focus:outline-2 outline-yellow text-yellow placeholder-gray px-4 py-2 opacity-0 animate-fade fill-mode-forwards drop-shadow-md" />
              {
                filtered.length == 0 ? 
                <div className="mt-2 lg:mt-4 text-center w-full text-gray font-lobster text-4xl">
                  No games found...
                </div> : 
                <div className="mt-2 lg:mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                  {
                    filtered.map((g, i) => 
                      <span key={i} className={`opacity-0 animate-fade animation-delay-[${(i+1)*50}ms] fill-mode-forwards`}>
                        <GameButton game={g.game} color={g.color}/>
                      </span>)
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div> 
  )
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Example() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Options
          {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Account settings
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full px-4 py-2 text-left text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}