import { Animation } from "./Animation"

export function ExternalButton({color, href, children}) {

    return (
        <a href={ href } target="_blank" className="group flex relative cursor-pointer">
            <div className="pointer-events-none absolute text-gray p-8 flex flex-col items-center z-10 h-full">
                { children }
            </div>
            <Animation color={ color } />
        </a>
    )
}
