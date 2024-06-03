import { useContext, useEffect } from "react";
import { Navbar } from "../components/navbar/Navbar";
import { ThemeContext } from "../App";

export function Error() {

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme("yellow"), [])
    
    return (
      <div className="flex flex-col items-center m-8">
        <div className="w-full max-w-6xl">
          <Navbar />
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-center w-full max-w-4xl mt-4 md:mt-8">
                <div className="flex flex-wrap-reverse items-center justify-between w-full p-8 opacity-0 bg-dark-900 rounded-3xl animate-fade fill-mode-forwards drop-shadow-md">
                    <div className={`font-lobster text-yellow text-4xl`}>
                        Error
                    </div>
                </div>
                <div className="p-8 mt-2 text-lg opacity-0 bg-dark-900 text-gray rounded-3xl animate-fade animation-delay-100 fill-mode-forwards drop-shadow-md">
                    There was a problem processing your request. If you continue to see this page and are having trouble playing games then please contact support at&nbsp;
                    <a className="underline text-yellow" href="mailto:support@quibbble.com">support@quibbble.com</a>.
                </div>
            </div>
          </div>
        </div>
      </div> 
    )
}
