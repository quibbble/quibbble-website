import React from "react";
import { useDroppable } from '@dnd-kit/core';

export default function DropSpace({ row, col , children }) {
    const {isOver, setNodeRef} = useDroppable({
        id: row + "," + col,
        data: {
            row: row,
            col: col
        }
    });

    return (
        <div ref={ setNodeRef } className={ isOver ? "bg-white opacity-25" : "" }>{ children }</div>
    )
}
