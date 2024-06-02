import React, { useState, useEffect, forwardRef, useCallback } from "react";
import { BsArrowClockwise, BsArrowUp } from "react-icons/bs";
import DropSpace from "./DropSpace";
import { DraggableTile, Tile } from "./Tile";
import { DndContext, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';

export const Tsuro = forwardRef((props, ref) => {

    let name = localStorage.getItem("name")
    const split = name.split(":")
    if (split.length == 2 && split[0] == "quibbble") name = "quibbble"

    const { game, send } = props;

    const place = (row, col, tile) => send({"type": "place", "details": {"row": row, "col": col, "tile": tile}});
    
    const rotate = (tile) => send({"type": "rotate", "details": {"tile": tile}});

    const [team, setTeam] = useState("")
    useEffect(() => { if (game.connection) setTeam(game.connection[name]) }, [game.connection])

    const [hand, setHand] = useState([]);
    useEffect(() => {
        if (!team) setHand([])
        else if (game.snapshot && game.snapshot.details && game.snapshot.details.hands && game.snapshot.details.hands[team]) setHand(game.snapshot.details.hands[team])
     }, [game.snapshot, team])

    // drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const handleDragEnd = useCallback((e) => {
        if (!e.over || team !== game.snapshot.turn || game.snapshot.winners.length > 0) return
        place(e.over.data.current.row, e.over.data.current.col, e.active.data.current.edges)
    }, [team, game.snapshot])

    // board resize logic
    const [tileSize, setTileSize] = useState(0);

    const handleResize = useCallback(() => {
        const size = 8.5;
        if (!ref || !ref.current) return;
        else if (ref.current.clientHeight < ref.current.clientWidth) setTileSize(ref.current.clientHeight/size);
        else setTileSize(ref.current.clientWidth/size);
    }, [ref])

    useEffect(() => handleResize());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize)
    }, [handleResize]);

    return (
        <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
            <div className="h-full flex flex-col justify-center items-center grow">
                <div className="box-border flex flex-col mb-8" style={{ width: `${ tileSize*6 }px`, height: `${ tileSize*6 }px` }}>
                    { 
                        game.snapshot && game.snapshot.details  ? game.snapshot.details.board.map((row, rIdx) => 
                            <div key={ rIdx } className="w-full h-full flex">
                                {
                                    row.map((el, cIdx) => 
                                        <DropSpace key={ cIdx } row={ rIdx } col={ cIdx }>
                                            <div className="box-border border border-slate" style={{ width: `${tileSize}px`, height: `${tileSize}px` }}>
                                                { 
                                                    el ? 
                                                        <Tile edges={ el.edges } paths={ el.paths } row={ rIdx } col={ cIdx } tokens={ game.snapshot.details.tokens } /> : 
                                                        <Tile edges={ null } paths={ null } row={ rIdx } col={ cIdx } tokens={ game.snapshot.details.tokens } /> 
                                                }
                                            </div>
                                        </DropSpace>) 
                                }
                            </div>) : null
                    }
                </div>

                <div className="w-full flex items-center justify-center" style={{ height: `${tileSize}px` }}> 
                    {
                        [0, 1, 2].map((_, idx) => 
                            <div key={ idx } className={`box-border border border-slate ${ idx != 2 ? "mr-4 md:mr-8" : "" }`} style={{ width: `${ tileSize }px`, height: `${ tileSize }px` }}>
                                { 
                                    hand.length > idx ? 
                                        <div className={`cursor-pointer`} onClick={ () => rotate(hand[idx].edges) }>
                                            { <DraggableTile id={ idx+1 } edges={ hand[idx].edges } paths={ hand[idx].paths } row={ -1 } col={ -1 } tokens={ {} } /> }
                                        </div> : null
                                }
                            </div>) 
                    }
                </div>
            </div>
        </DndContext>
)})
