import { useContext, useEffect } from "react";
import { ExternalButton } from "../components/external_button/ExternalButton";
import { Navbar } from "../components/navbar/Navbar";
import { QCorner } from "../components/qcorner/QCorner";
import { ThemeContext } from "../App";

export function Community() {

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme("yellow"), [])
    
    return (
      <div className="flex flex-col items-center m-8">
        <div className="w-full max-w-6xl">
          <Navbar />
          <div className="flex flex-col items-center w-full">
            <div className="flex w-full mt-4 md:mt-8">
                <span className="hidden lg:flex"> 
                    <QCorner />
                </span>
                <div className="flex flex-col w-full md:ml-4">
                  <div className="flex items-center justify-between w-full p-8 opacity-0 bg-dark-900 rounded-3xl animate-fade fill-mode-forwards drop-shadow-md">
                    <div className={`font-lobster text-yellow text-4xl`}>
                        Community
                    </div>
                  </div>
                  <div className="text-lg mt-2 md:mt-4 p-8 grow bg-dark-900 rounded-3xl text-gray shadow-md opacity-0 animate-fade fill-mode-forwards drop-shadow-md animation-delay-[100ms]">
                    <p>
                      Created in 2020, Quibbble is a fully free and Open Source board game platform. Since its inception, thousands of people have played games on the platform with hopefully many more to come.
                    </p>
                    <br></br>
                    <p>
                      We do not show ads nor track and sell user data. This is purely a passion project with all expenses covered through donations or paid for out of pocket. If you enjoy Quibbble and want to contribute then check out the resources below. As always, thanks for playing!
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mt-2 md:mt-4 sm:grid-cols-3">
                    <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[200ms]">
                        <ExternalButton color={'yellow'} href={"https://discord.com/invite/VKvjutuhUp"}>
                          <h1 className={`font-lobster text-4xl text-yellow`}>Chat</h1>
                          <p className='mt-4 grow'>Join our Discord and chat with fellow Quibbblers.</p>
                        </ExternalButton>
                    </span>
                    <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[300ms]">
                        <ExternalButton href={"https://github.com/quibbble"} color={'yellow'}>
                          <h1 className={`font-lobster text-4xl text-yellow`}>Code</h1>
                          <p className='mt-4 grow'>Add a game or contribute new features.</p>
                        </ExternalButton>
                    </span>
                    <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[400ms]">
                        <ExternalButton href={"https://www.buymeacoffee.com/quibbble"} color={'yellow'}>
                          <h1 className={`font-lobster text-4xl text-yellow`}>Donate</h1>
                          <p className='mt-4 grow'>Help out with server and development costs.</p>
                        </ExternalButton>
                    </span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div> 
    )
}
