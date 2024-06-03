import { Navbar } from "../components/navbar/Navbar";
import { GameButton } from "../components/game_button/GameButton";
import { useContext, useEffect, useState } from "react";
import { gamedata } from "../data/games";
import { QCorner } from "../components/qcorner/QCorner";
import { ThemeContext } from "../App";

export function Games() {

  const { setTheme } = useContext(ThemeContext);
  useEffect(() => setTheme("yellow"), [])

  const [search, setSearch] = useState("")
  const [filtered, setFiltered] = useState(Object.keys(gamedata))
  useEffect(() => { setFiltered(Object.keys(gamedata).filter(key => key.includes(search.toLowerCase()))) }, [search])

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
              <input type="text" placeholder="search" value={search} onChange={e => setSearch(e.target.value)} className="self-end w-full px-4 py-2 font-bold rounded-full opacity-0 bg-dark-900 md:max-w-64 focus:outline focus:outline-2 outline-yellow text-slate placeholder-gray animate-fade fill-mode-forwards drop-shadow-md" />
              {
                filtered.length == 0 ? 
                <div className="w-full mt-2 text-4xl text-center lg:mt-4 text-gray font-lobster">
                  No games found...
                </div> : 
                <div className="grid grid-cols-2 gap-2 mt-2 lg:mt-4 sm:grid-cols-3 md:grid-cols-4 md:gap-3 lg:gap-4">
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
