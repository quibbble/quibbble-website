import { useContext, useEffect } from "react";
import { ExternalButton } from "../components/external_button/ExternalButton";
import { Navbar } from "../components/navbar/Navbar";
import { QCorner } from "../components/qcorner/QCorner";
import { ThemeContext } from "../App";

export function Error() {

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme("yellow"), [])
    
    return (
      <div className="flex flex-col items-center m-8">
        <div className="w-full max-w-6xl">
          <Navbar />
          <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-center mt-4 md:mt-8 w-full max-w-4xl">
                <div className="flex flex-wrap-reverse justify-between items-center w-full bg-dark-900 p-8 rounded-3xl opacity-0 animate-fade fill-mode-forwards drop-shadow-md">
                    <div className={`font-lobster text-yellow text-4xl`}>
                        Error
                    </div>
                </div>
                <div className="mt-2 bg-dark-900 text-gray text-lg p-8 rounded-3xl opacity-0 animate-fade animation-delay-100 fill-mode-forwards drop-shadow-md">
                    There was a problem processing your request. If you continue to see this page and are having trouble playing games then please contact support at&nbsp;
                    <a className="text-yellow underline" href="mailto:support@quibbble.com">support@quibbble.com</a>.
                </div>
            </div>
          </div>
        </div>
      </div> 
    )
}
