import React, { useEffect, useState, forwardRef, useCallback } from "react";
import DropSpace from "./DropSpace";
import { Tile, DraggableTile } from "./Tile";
import { DndContext, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';

export const Indigo = forwardRef((props, ref) => {

    let name = localStorage.getItem("name")
    const split = name.split(":")
    if (split.length == 2 && split[0] == "quibbble") name = "quibbble"

    const { game, send } = props;

    const place = (tile, row, col) => send({type: "place", details: {tile: tile, row: row, col: col}});
    const rotate = (tile) => send({type: "rotate", details: {tile: tile}});

    // game data
    const [team, setTeam] = useState("")
    useEffect(() => { if (game.connection) setTeam(game.connection[name]) }, [game.connection])
    
    const [turn, setTurn] = useState("");
    const [winners, setWinners] = useState([]);
    const [variant, setVariant] = useState("");
    const [board, setBoard] = useState({});
    const [hands, setHands] = useState({});
    useEffect(() => {
        if (game.snapshot) {
            setTurn(game.snapshot.turn)
            setWinners(game.snapshot.winners)
        }
        if (game.snapshot && game.snapshot.details) {
            setBoard(game.snapshot.details.board)
            setHands(game.snapshot.details.hands)
            setVariant(game.snapshot.details.variant)
        }
    }, [game.snapshot])

    // isOver logic
    const [over, setOver] = useState({"Test": false})
    
    // drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const handleDragEnd = useCallback((e) => {
        if (!e.over || team !== turn || winners.length > 0) return
        place(e.active.data.current.paths, e.over.data.current.row, e.over.data.current.col)
    }, [team, turn, winners])

    // board resize logic
    const [tileSize, setTileSize] = useState(0);

    const handleResize = useCallback(() => {
        const size = 11;
        if (!ref || !ref.current) return;
        else if (ref.current.clientWidth > ref.current.clientHeight) {
            setTileSize(ref.current.clientHeight/size);
        } else setTileSize(ref.current.clientWidth/size);
    }, [ref])

    useEffect(() => handleResize());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return _ => window.removeEventListener("resize", handleResize)
    }, [handleResize]);

    return (
        <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
            <div className="flex flex-col items-center justify-center h-full grow">
                <div className="" style={{ width: `${ tileSize*9 }px`, height: `${ tileSize*9*.975 }px` }}>
                    <div className={`box-border flex flex-col`} style={{ width: `${ tileSize*9 }px`, height: `${ tileSize*9*0.84 }px` }}>
                        {
                            board && board.tiles ? board.tiles.map((row, rIdx) => 
                                <div key={ rIdx } className="flex items-center justify-center w-full h-full">
                                    {
                                        row.map((el, cIdx) => 
                                                <div key={ rIdx + "," + cIdx } className="box-border" style={{ width: `${tileSize}px`, height: `${tileSize*1.1546}px`, marginBottom: `${tileSize*-1}px`, marginRight: `${tileSize*-0.024}px`}}>
                                                    { 
                                                        el ? 
                                                            <Tile paths={ el.paths } row={ rIdx } col={ cIdx } treasure={ el.treasure } gems={ board.gems } gateways={ board.gateways }>
                                                                <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } tileSize={ tileSize } />
                                                            </Tile> : 
                                                            <Tile paths={ null } row={ rIdx } col={ cIdx } treasure={ false } gems={ null } gateways={ board.gateways } over={ over }>
                                                                <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } tileSize={ tileSize } setOver={ setOver } />                                   
                                                            </Tile> 
                                                    }
                                                </div>) 
                                    }
                                </div>) : null
                        }
                    </div>
                </div>

                <div className="flex items-center justify-center w-full" style={{ height: `${tileSize}px` }}>
                    <div className="flex gap-8">
                    {
                        variant === "large_hands" ? [0, 1].map((_, idx) => 
                            <div key={ "hand" + idx } style={{ width: `${ tileSize*1.2 }px`, height: `${ tileSize*1.1546*1.2 }px` }}>
                                { 
                                    team && hands[team] && hands[team].length > idx ? 
                                        <div className="cursor-pointer" onClick={ () => rotate(hands[team][idx].paths) }>
                                            <DraggableTile paths={ hands[team][idx].paths } row={ -1 } col={ -1 } treasure={ false } gems={ null } />
                                        </div> : 
                                        <Tile paths={ null } row={ -1 } col={ -1 } treasure={ false } gems={ null } />
                                }
                            </div>) : [0].map((_, idx) => 
                            <div key={ "hand" + idx } style={{ width: `${ tileSize*1.2 }px`, height: `${ tileSize*1.1546*1.2 }px` }}>
                                { 
                                    team && hands[team] && hands[team].length > 0 ? 
                                        <div className="cursor-pointer" onClick={ () => rotate(hands[team][idx].paths) }>
                                            <DraggableTile paths={ hands[team][idx].paths } row={ -1 } col={ -1 } treasure={ false } gems={ null } />
                                        </div> : 
                                        <Tile paths={ null } row={ -1 } col={ -1 } treasure={ false } gems={ null } />

                                }
                            </div>)
                    }
                    </div>
                </div>
            </div>
        </DndContext>
    )
})
