import React, { useEffect, useState, forwardRef } from "react";
import Path from "./Path";
import Gem from "./Gem";
import { useDraggable } from '@dnd-kit/core';

export function DraggableTile({ paths, row, col, treasure, gems, gateways, children }) {
    const {attributes, isDragging, listeners, setNodeRef, transform} = useDraggable({
        id: paths,
        data: {
            paths: paths
        }
    });

    const style = {
        opacity: isDragging ? 0.75 : undefined,
        touchAction: "none",
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
    }

    return (
        <Tile ref={ setNodeRef } style={ style } 
            {...attributes} {...listeners}
            paths={paths} row={row} col={col} 
            treasure={treasure} gems={gems} 
            gateways={gateways} over={ {} }>
                { children }
        </Tile>
    )
}

export const Tile = forwardRef(({ paths, row, col, treasure, gems, gateways, over, children, ...props }, ref) => {

    const defaultFill = "fill-white"
    const [edges, setEdges] = useState({
        "a": defaultFill,
        "b": defaultFill,
        "c": defaultFill,
        "d": defaultFill,
        "e": defaultFill,
        "f": defaultFill,
    })

    const [fill, setFill] = useState("fill-slate")
    useEffect(() => {
        if (over && over[row + "," + col]) setFill("fill-slate")
        else setFill("fill-dark-900")
    }, [over])

    useEffect(() => {
        if (!gateways) return
        for (let gateway of gateways) {
            for (let location of gateway.locations) {
                if (location[0] === row && location[1] === col) {
                    let temp = edges
                    if (gateway.teams.length === 1) {
                        temp[gateway.edges[0]] = "fill-" + gateway.teams[0]
                        temp[gateway.edges[1]] = "fill-" + gateway.teams[0]
                    } else {
                        temp[gateway.edges[0]] = "fill-" + gateway.teams[0]
                        temp[gateway.edges[1]] = "fill-" + gateway.teams[1]
                    }
                    setEdges(temp)
                    return
                }
            }
        }
    }, [row, col, edges, gateways]);

    return (
        <div ref={ ref } { ...props }>
            <div>
                <div className="absolute">
                    { children }
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115.47">
                    { treasure ? <polygon className="fill-indigo" points="97.74 30.17 97.74 85.3 50 112.87 2.26 85.3 2.26 30.17 50 2.61 97.74 30.17"/> : <></> }
                    { !treasure && paths ? <polygon className="fill-dark-600" points="97.74 30.17 97.74 85.3 50 112.87 2.26 85.3 2.26 30.17 50 2.61 97.74 30.17"/> : <></> }
                    { !treasure && !paths ? <polygon className={ fill } points="97.74 30.17 97.74 85.3 50 112.87 2.26 85.3 2.26 30.17 50 2.61 97.74 30.17"/> : <></> }
                    {
                        paths ?
                        [0, 2, 4].map(idx => {
                            if (treasure && idx === 0 && paths[0] === "s") {
                                return <g key={ idx }> 
                                        <Path treasure={ treasure } path={ "a" } color={ `fill-white` } />
                                        <Path treasure={ treasure } path={ "b" } color={ `fill-white` } />
                                        <Path treasure={ treasure } path={ "c" } color={ `fill-white` } />
                                        <Path treasure={ treasure } path={ "d" } color={ `fill-white` } />
                                        <Path treasure={ treasure } path={ "e" } color={ `fill-white` } />
                                        <Path treasure={ treasure } path={ "f" } color={ `fill-white` } />
                                    </g>
                            } else if (treasure && idx === 2) {
                                return <Path key={ idx } treasure={ treasure } path={ paths[idx] } color={ `fill-white` } />
                            } else {
                                return <Path key={ idx } treasure={ treasure } path={ paths[idx]+paths[idx+1] } color={ `fill-white` } />
                            }
                        }) : <></>
                    }
                    {
                        gems ? gems.map((gem, idx) => {
                            const colorMap = {
                                "amber": "fill-yellow",
                                "emerald": "fill-green",
                                "sapphire": "fill-sky"
                            }
                            if (gem.row !== row || gem.col !== col) {
                                return null
                            }
                            if (gem.edge === "s") {
                                return <Gem key={ idx } edge={ gem.edge + (idx - 5) } onTreasure={ treasure } color={ colorMap[gem.color] } />
                            }
                            return <Gem key={ idx } edge={ gem.edge } onTreasure={ treasure } color={ colorMap[gem.color] } />
                        }) : <></>
                    }
                    <g>
                        <polygon className={ edges["a"] } points="50 0 50 2.61 2.26 30.17 0 28.87 50 0"/>
                        <polygon className={ edges["b"] } points="100 28.87 97.74 30.17 50 2.61 50 0 100 28.87"/>
                        <polygon className={ edges["c"] } points="100 28.87 100 86.6 97.74 85.3 97.74 30.17 100 28.87"/>
                        <polygon className={ edges["d"] } points="100 86.6 50 115.47 50 112.87 97.74 85.3 100 86.6"/>
                        <polygon className={ edges["e"] } points="50 112.87 50 115.47 0 86.6 2.26 85.3 50 112.87"/>
                        <polygon className={ edges["f"] } points="2.26 30.17 2.26 85.3 0 86.6 0 28.87 2.26 30.17"/>
                    </g>
                </svg>
            </div>
        </div>
    )
})
