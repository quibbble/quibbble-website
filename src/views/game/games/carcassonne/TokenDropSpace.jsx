import React, { useEffect } from "react";
import { useDroppable } from '@dnd-kit/core';

const sectionToToken = {farm: "farmer", city: "knight", road: "thief", cloister: "monk"};

export default function TokenDropSpace({ x, y, type, sides, hoverColor, bbox, el }) {
    const {isOver, setNodeRef} = useDroppable({
        id: x + "," + y + "," + type + "," + sides,
        data: {
            x: x,
            y: y,
            type: sectionToToken[type],
            sides: sides
        }
    });

    return (
        <g ref={ !bbox ? setNodeRef : null }>
            <g ref={ bbox ? setNodeRef : null }>
                { bbox }
            </g>
            { React.cloneElement(el, isOver ? {fill: hoverColor} : {}) }
        </g>)
}
