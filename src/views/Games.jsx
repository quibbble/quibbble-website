import { Navbar } from "../components/navbar/Navbar";
import { GameButton } from "../components/game_button/GameButton";
import { useEffect, useState } from "react";
import { gamedata } from "../data/games";
import { QCorner } from "../components/qcorner/QCorner";

export function Games() {

  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(Object.keys(gamedata))
  useEffect(() => { setFiltered(Object.keys(gamedata).filter(key => key.includes(search.toLowerCase()))) }, [search])

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
              <input type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} className="self-end bg-dark-900 w-full font-bold md:max-w-64 rounded-full focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray px-4 py-2 opacity-0 animate-fade fill-mode-forwards drop-shadow-md" />
              {
                filtered.length == 0 ? 
                <div className="mt-2 lg:mt-4 text-center w-full text-gray font-lobster text-4xl">
                  No games found...
                </div> : 
                <div className="mt-2 lg:mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                  {
                    filtered.map((key, i) => 
                      <span key={i} className={`opacity-0 animate-fade animation-delay-[${(i+1)*50}ms] fill-mode-forwards`}>
                        <GameButton game={key} />
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
