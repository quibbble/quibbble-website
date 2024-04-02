import { ExternalButton } from "../components/external_button/ExternalButton";
import { Navbar } from "../components/navbar/Navbar";
import { QCorner } from "../components/qcorner/QCorner";

export function Community() {
    return (
      <div className="flex flex-col items-center m-8">
        <div className="w-full max-w-6xl">
          <Navbar />
          <div className="flex flex-col items-center w-full">
            <div className="flex mt-4 md:mt-8 w-full">
                <span className="hidden lg:flex"> 
                    <QCorner />
                </span>
                <div className="md:ml-4 w-full flex flex-col">
                  <div className="flex justify-between items-center w-full bg-dark-900 p-8 rounded-3xl opacity-0 animate-fade fill-mode-forwards drop-shadow-md">
                    <div className={`font-lobster text-yellow text-4xl`}>
                        Community
                    </div>
                  </div>
                  <div className="mt-2 md:mt-4 p-8 grow bg-dark-900 rounded-3xl text-gray shadow-md opacity-0 animate-fade fill-mode-forwards drop-shadow-md animation-delay-[100ms]">
                    <p>Quibbble is a fully free and Open Source board game platform created to provide a virtual space to connect with friends and family. Quibbble was created in 2020 and since starting, thousands of people have played games on the platform. Most "free" website continue to exist by selling ad space or user data. Quibbble does none of this. Expenses are kept at a minimum and paid for through donations or out of pocket. If you enjoy Quibbble and want to help grow this fledgling community then check out the resources below. As always, thanks for playing!</p>
                    <p className="mt-2">~Chris</p>
                  </div>
                  <div className="mt-2 md:mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[200ms]">
                        <ExternalButton color={'purple'} href={"https://discord.com/invite/VKvjutuhUp"}>
                          <h1 className={`font-lobster text-4xl text-purple`}>Chat</h1>
                          <p className='mt-4 grow'>Join our Discord and chat with fellow Quibbblers.</p>
                        </ExternalButton>
                    </span>
                    <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[300ms]">
                        <ExternalButton href={"https://github.com/quibbble"} color={'sky'}>
                          <h1 className={`font-lobster text-4xl text-sky`}>Code</h1>
                          <p className='mt-4 grow'>Add a game or contribute new features.</p>
                        </ExternalButton>
                    </span>
                    <span className="opacity-0 animate-fade fill-mode-forwards animation-delay-[400ms]">
                        <ExternalButton href={"https://www.buymeacoffee.com/quibbble"} color={'red'}>
                          <h1 className={`font-lobster text-4xl text-red`}>Donate</h1>
                          <p className='mt-4 grow'>Help keep the lights on by contributing financially.</p>
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
