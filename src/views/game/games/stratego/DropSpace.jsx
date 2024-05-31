import React from "react";
import { useDroppable } from '@dnd-kit/core';

export default function DropSpace({team, row, col, justMoved, children}) {
    const {isOver, setNodeRef} = useDroppable({
        id: "space:" + row + "," + col,
        data: {
            row: row,
            col: col
        }
    });

    return (
        <div ref={ setNodeRef } className={ isOver ? "bg-slate" : justMoved ? `bg-${ team } opacity-50` : "" }>{ children }</div>
    )
}
