import { Navbar } from "../components/navbar/Navbar";
import { QCorner } from "../components/qcorner/QCorner";

export function FAQ() {
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
                  <div className="flex flex-wrap-reverse justify-between items-center w-full bg-dark-900 p-8 rounded-3xl opacity-0 animate-fade fill-mode-forwards drop-shadow-md">
                    <div className={`font-lobster text-yellow text-4xl`}>
                      FAQ
                    </div>
                    
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div> 
    )
}
