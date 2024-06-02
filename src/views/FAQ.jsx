import { useContext, useEffect, useState } from "react";
import { Navbar } from "../components/navbar/Navbar";
import { QCorner } from "../components/qcorner/QCorner";
import { BiSolidRightArrow, BiSolidDownArrow } from "react-icons/bi";
import { ThemeContext } from "../App";

export function FAQ() {

    const { setTheme } = useContext(ThemeContext);
    useEffect(() => setTheme("yellow"), [])
    
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
                  <div className="flex flex-wrap-reverse justify-between items-center w-full bg-dark-900 p-8 rounded-3xl opacity-0 animate-fade fill-mode-forwards duration-500 drop-shadow-md">
                    <div className={`font-lobster text-yellow text-4xl`}>
                      FAQ
                    </div>
                  </div>
                  <Fact 
                    className="opacity-0 animate-fade fill-mode-forwards animation-delay-[150ms]"
                    question={"Can I chat or video call in game?"} 
                    answer={"Yes! Quibbble supports basic in game chatting. To voice or video call please use an external provider such as Discord or Skype."} 
                  />
                  <Fact 
                    className="opacity-0 animate-fade fill-mode-forwards animation-delay-[225ms]"
                    question={"Can I come back to a game later?"}
                    answer={"Yes! All games are saved for at least 30 days. You and your friends can pick up where you left off by returning to the same game link in the future."} 
                  />
                  <Fact 
                    className="opacity-0 animate-fade fill-mode-forwards animation-delay-[300ms]"
                    question={"Can everyone play on one device?"} 
                    answer={<p>Yes! Just create a <span className="italic">local</span> game and then pass the device around on each turn.</p>} 
                  />
                  <Fact 
                    className="opacity-0 animate-fade fill-mode-forwards animation-delay-[350ms]"
                    question={"What data do you collect?"} 
                    answer={"We collect the total number of visits to the site and total game counts to gauge overall interest. We do not collect any personally identifiable information and never will."} 
                  />
                  <Fact 
                    className="opacity-0 animate-fade fill-mode-forwards animation-delay-[400ms]"
                    question={"How does Quibbble make money?"} 
                    answer={<p>We don't! This is purely a passion project. It's not cheap to run the servers and continue with updates so please consider <a href={"https://www.buymeacoffee.com/quibbble"} target="_blank" className="italic underline text-yellow">donating</a> if you want to help us keep the lights on.</p>} 
                  />
                  <Fact 
                    className="opacity-0 animate-fade fill-mode-forwards animation-delay-[425ms]"
                    question={"Don't see your question?"} 
                    answer={<div>Please reach out to <a className="text-yellow hover:text-white underline transition ease-in-out duration-300" href="mailto:hello@quibbble.com">hello@quibbble.com</a>. We'll get back to you as soon as possible.</div>} 
                  />
                </div>
            </div>
          </div>
        </div>
      </div> 
    )
}

function Fact({question, answer, className}) {

  const [show, setShow] = useState(false)

  return (
    <div onClick={() => setShow(!show)} className={`mt-2 cursor-pointer text-white hover:text-slate transition-colors duration-500 ease-in-out bg-dark-900 p-8 rounded-3xl drop-shadow-m ${className}`}>
      <p className="font-bold flex items-center">{ show ? <BiSolidDownArrow className="text-yellow mr-2" /> : <BiSolidRightArrow className="text-yellow mr-2" /> } { question }</p>
      <div style={show ? {
          maxHeight: "300px",
          transition: "max-height 0.5s ease-in",
        } : {
          overflow: "hidden",
          maxHeight: 0,
          transition: "max-height 0.3s ease-out"
        }} className={`text-slate overflow-hidden`}>{ answer }</div>
    </div>
  )
}
