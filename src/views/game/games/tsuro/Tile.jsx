import React, { useEffect, useState, forwardRef } from "react";
import Notch from "./Notch";
import Edge from "./Edge";
import { useDraggable } from '@dnd-kit/core';

export function DraggableTile({ id, edges, paths, row, col, tokens }) {
    const {attributes, isDragging, listeners, setNodeRef, transform} = useDraggable({
        id: id,
        data: {
            edges: edges
        }
    });

    const style = {
        opacity: isDragging ? 0.9 : undefined,
        touchAction: "none",
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
    }

    return (
        <Tile ref={ setNodeRef } style={ style } 
            {...attributes} {...listeners}
            edges={edges} paths={paths} row={row} col={col} tokens={tokens} />
    )
}

export const Tile = forwardRef(({ edges, paths, row, col, tokens, ...props }, ref) => {    
    const [notches, setNotches] = useState([]);
    useEffect(() => {
        let temp = [];
        Object.keys(tokens).forEach(team => {
            if (tokens[team]["row"] === row && tokens[team]["col"] === col) temp.push(<Notch key={team} notch={tokens[team]["notch"]} color={`fill-${team}`}/>);
        });
        setNotches(temp)
    }, [row, col, tokens]);

    return (
        <div ref={ ref } className={ edges ? "bg-dark-700" : "" } { ...props }>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
                {
                    edges ?
                    [0, 2, 4, 6].map(idx => {
                        const edge = edges[idx]+edges[idx+1];
                        const t1 = paths[edge];
                        const t2 = paths[edge[1]+edge[0]];
                        return <Edge key={ idx } edge={ edge } color={ t1 ? `fill-${t1}` : t2 ? `fill-${t2}` : `fill-slate` } />
                    }) : null
                }
                { notches.map(n => n) }
            </svg>
        </div>
    )
})
