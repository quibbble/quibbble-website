import React, { useEffect, useState, forwardRef, useCallback } from "react";
import DropSpace from "./DropSpace";
import { DraggableUnit, TxtMap } from "./Unit";
import { DndContext, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';

export const Stratego = forwardRef((props, ref) => {

    let name = localStorage.getItem("name")
    const split = name.split(":")
    if (split.length == 2 && split[0] == "quibbble") name = "quibbble"

    const { game, send } = props;

    const switchUnits = (unitARow, unitACol, unitBRow, unitBCol) => send({type: "switch", details: {unita_row: unitARow, unita_col: unitACol, unitb_row: unitBRow, unitb_col: unitBCol}});
    const toggleReady = () => send({type: "ready"});
    const moveUnit = (unitRow, unitCol, tileRow, tileCol) => send({type: "move", details: {unit_row: unitRow, unit_col: unitCol, tile_row: tileRow, tile_col: tileCol}});

    // game data
    const [team, setTeam] = useState("")
    useEffect(() => { if (game.connection) setTeam(game.connection[name]) }, [game.connection])
    
    const [turn, setTurn] = useState("");
    const [teams, setTeams] = useState([]);
    const [winners, setWinners] = useState([]);
    const [history, setHistory] = useState([]);
    const [variant, setVariant] = useState("");
    const [started, setStarted] = useState(false);
    const [ready, setReady] = useState({});
    const [board, setBoard] = useState([]);
    const [battle, setBattle] = useState({});
    const [justBattled, setJustBattled] = useState(false);
    useEffect(() => {
        if (game.snapshot) {
            setTurn(game.snapshot.turn)
            setTeams(game.snapshot.teams)
            setWinners(game.snapshot.winners)
            setHistory(game.snapshot.history ? game.snapshot.history : [])
        }
        if (game.snapshot && game.snapshot.details) {
            setBoard(game.snapshot.details.board)
            setReady(game.snapshot.details.ready)
            setBattle(game.snapshot.details.battle)
            setJustBattled(game.snapshot.details.just_battled)
            setStarted(game.snapshot.details.started)
            setVariant(game.snapshot.details.variant)
        }
    }, [game.snapshot])

    // drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const handleDragEnd = useCallback((e) => {
        if (!e.over || (started && team !== turn) || winners.length > 0) return

        let over = e.over.data.current
        let active = e.active.data.current

        let a = board[active.row][active.col]
        let b = board[over.row][over.col]
        if (started || (a && !b) || (a && b && a.team != b.team)) moveUnit(active.row, active.col, over.row, over.col)
        else switchUnits(active.row, active.col, over.row, over.col)
    }, [team, started, turn, winners, board])

    // board resize logic
    const [tileSize, setTileSize] = useState(0);

    const handleResize = useCallback(() => {
        const width = variant === "QuickBattle" ? 8 : 10;
        const scale = .85
        if (!ref || !ref.current) return;
        else if (ref.current.clientWidth > ref.current.clientHeight) setTileSize(ref.current.clientHeight/width*scale);
        else setTileSize(ref.current.clientWidth/width*scale);
    }, [ref, variant])

    useEffect(() => handleResize());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return _ => window.removeEventListener("resize", handleResize)
    }, [handleResize]);

    return (
        <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
            <div className="flex flex-col items-center justify-center h-full grow">
                {
                    started ? <div className="flex items-center justify-center w-full pb-2 text-xs italic font-light text-right text-slate md:text-sm">
                                <p className={ !(battle && battle.attacking_unit && battle.attacked_unit && justBattled) ? "opacity-0" : "" }>
                                    {
                                        battle && battle.attacking_unit && battle.attacked_unit ? <span>
                                            <span className={`text-${battle.attacking_unit.team}`}>{battle.attacking_unit.type} ({TxtMap[battle.attacking_unit.type]})</span> attacked <span className={`text-${battle.attacked_unit.team}`}>{battle.attacked_unit.type} ({TxtMap[battle.attacked_unit.type]})</span> and { battle.winning_team === "" ? "tied" : battle.attacking_unit.team === battle.winning_team ? "won" : "lost" }
                                        </span> : <span>no recent battle</span>
                                    }
                                </p>
                            </div> : <></>
                }

                <div className="box-border flex flex-col mb-2" style={{ width: `${ tileSize*(variant === "quick_battle" ? 8 : 10) }px`, height: `${ tileSize*(variant === "quick_battle" ? 8 : 10) }px` }}>
                    { 
                        board ? board.map((row, rIdx) => 
                            <div key={ rIdx } className="flex w-full h-full">
                                {
                                    row.map((el, cIdx) => 
                                        <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } team={ history.length > 0 ? history[history.length-1].team : "" } justMoved={ history.length > 0 && history[history.length-1].type === "move" && history[history.length-1].details.unit_row == rIdx && history[history.length-1].details.unit_col == cIdx }>
                                            <div className="box-border border border-dark-600" style={{ width: `${tileSize}px`, height: `${tileSize}px` }}>
                                                {
                                                    el && (el.team || el.type !== "")  ? 
                                                        <DraggableUnit key={ rIdx + "," + cIdx} row={ rIdx } col={ cIdx } team={ el.team ? el.team : "" } type={ el.type ? el.type : "" } turn={ turn } selectedTeam={ team } started={ started } winners={ winners } /> : 
                                                        <></>
                                                }
                                            </div>
                                        </DropSpace>) 
                                }
                            </div>) : null
                    }
                </div>
            </div>
        </DndContext>
    )
})
