import { Animation } from "./Animation"

export function ExternalButton({color, href, children}) {

    return (
        <a href={ href } target="_blank" className="relative flex cursor-pointer group">
            <div className="absolute z-10 flex flex-col items-center h-full p-8 pointer-events-none text-gray">
                { children }
            </div>
            <Animation color={ color } />
        </a>
    )
}
