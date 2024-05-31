import React, { useEffect, useState, forwardRef, useCallback, createRef } from "react";
import { Tile, DraggableTile } from "./Tile";
import TileDropSpace from "./TileDropSpace";
import { DraggableToken } from "./Token";
import { DndContext, PointerSensor, useSensors, useSensor, rectIntersection, closestCenter, pointerWithin, closestCorners } from '@dnd-kit/core';
import { BOTTOM, LEFT, RIGHT, TOP } from "./models/side";
import { FARM } from "./models/structure";
import { BOTTOMA, BOTTOMB, LEFTA, LEFTB, RIGHTA, RIGHTB, TOPA, TOPB } from "./models/farmside";
import { COLORMAP } from "./models/color";
import { PiPuzzlePieceFill } from "react-icons/pi";

export const Carcassonne = forwardRef((props, ref) => {

    const name = localStorage.getItem("name")

    const { game, send } = props;

    const placeTile = (x, y, top, right, bottom, left, center, connectedCities, banner) => send({
        type: "place_tile", 
        details: {
            x: x,
            y: y,
            tile: { top: top, right: right, bottom: bottom, left: left, center: center, connected_cities: connectedCities, banner: banner }
        }});
    const rotateTile = () => send({ type: "rotate" });
    const placeToken = (x, y, type, side) => send({ type: "place_token", details: { x: x, y: y, type: type, side: side } });
    const pass = () => send({ type: "place_token", details: { pass: true } });

    // game data
    const [team, setTeam] = useState("")
    useEffect(() => { if (game.connection) setTeam(game.connection[name]) }, [game.connection])

    const [turn, setTurn] = useState("");
    const [winners, setWinners] = useState([]);
    const [board, setBoard] = useState([]);
    const [tokens, setTokens] = useState({});
    const [boardTokens, setBoardTokens] = useState([]);
    const [scores, setScores] = useState({});
    const [playTile, setPlayTile] = useState();
    const [lastPlacedTiles, setLastPlacedTiles] = useState();
    const [tilesRemaining, setTilesRemaining] = useState(0);
    useEffect(() => {
        if (game.snapshot) {
            setTurn(game.snapshot.turn)
            setWinners(game.snapshot.winners)
        }
        if (game.snapshot && game.snapshot.details) {
            setBoard(game.snapshot.details.board)
            setTokens(game.snapshot.details.tokens)
            setBoardTokens(game.snapshot.details.board_tokens)
            setScores(game.snapshot.details.scores)
            setPlayTile(game.snapshot.details.play_tile)
            setLastPlacedTiles(game.snapshot.details.last_placed)
            setTilesRemaining(game.snapshot.details.tiles_remaining)
        }
    }, [game.snapshot])

    // board rendering
    const [zoom, setZoom] = useState(1);
    const [minX, setMinX] = useState(0);
    const [maxX, setMaxX] = useState(0);
    const [minY, setMinY] = useState(0);
    const [maxY, setMaxY] = useState(0);
    const [xyToPlaceable, setXYToPlaceable] = useState({});
    const [xyToTile, setXYToTile] = useState({});
    useEffect(() => {
        let newMinX = 0;
        let newMaxX = 0;
        let newMinY = 0;
        let newMaxY = 0;
        let xyToPlaceable = {};
        let newXYToTile = {};
        for (let i = 0; i < board.length; i++) {
            let tile = board[i];
            if (tile.x <= newMinX) newMinX = tile.x-1;
            if (tile.x >= newMaxX) newMaxX = tile.x+1;
            if (tile.y <= newMinY) newMinY = tile.y-1;
            if (tile.y >= newMaxY) newMaxY = tile.y+1;
            let canPlace = new Map([[`${tile.x+1}${tile.y}`, true], [`${tile.x-1}${tile.y}`, true], [`${tile.x}${tile.y+1}`, true], [`${tile.x}${tile.y-1}`, true]]);
            for (let j = 0; j < board.length; j++) {
                if (canPlace.get(`${board[j].x}${board[j].y}`)) canPlace.set(`${board[j].x}${board[j].y}`, false);
            }
            canPlace.forEach((v,k) => {
                if (xyToPlaceable.hasOwnProperty(k) && !xyToPlaceable[k]) return;
                xyToPlaceable[k] = v;
            });
            newXYToTile[`${tile.x}${tile.y}`] = tile;
        }
        setMinX(newMinX);
        setMaxX(newMaxX);
        setMinY(newMinY);
        setMaxY(newMaxY);
        setXYToPlaceable(xyToPlaceable);
        setXYToTile(newXYToTile);
    }, [board]);

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

        let over = e.over.data.current
        let active = e.active.data.current

        if (active.type === "tile") placeTile(over.x, over.y, active.tile.sides.top.structure, active.tile.sides.right.structure, active.tile.sides.bottom.structure, active.tile.sides.left.structure, active.tile.sides.center.structure, active.tile.connected_cities, active.tile.banner)
        else if (active.type === "token" && over.sides) placeToken(over.x, over.y, over.type, over.sides[0])
    }, [team, turn, winners])

    // board resize logic
    const [tileSize, setTileSize] = useState(0);

    const handleResize = useCallback(() => {
        if (!ref || !ref.current) return;
        else setTileSize(ref.current.clientHeight/6);
    }, [ref])

    useEffect(() => handleResize());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return _ => window.removeEventListener("resize", handleResize)
    }, [handleResize]);

    const scrollRef = createRef()
    const [scrollX, setScrollX] = useState(0)
    const [scrollY, setScrollY] = useState(0)

    const handleScroll = (e) => {
        const { scrollHeight, scrollWidth, scrollTop, scrollLeft, clientHeight, clientWidth } = e.target;
        const sX = scrollLeft
        const sY = scrollTop

        setScrollX(sX)
        setScrollY(sY)
    }

    const zoomIn = () => {
        if (zoom < 1) setZoom(zoom + 0.1)
    }
    const zoomOut = () => {
        if (zoom >= .4) setZoom(zoom - 0.1)
    }

    return (
        <DndContext autoScroll={ false } onDragEnd={ handleDragEnd } sensors={ sensors }>
            <div className="w-full h-full flex flex-col justify-center items-center grow">
                <div ref={ scrollRef } onScrollCapture={ handleScroll } className="box-border relative overflow-auto w-full flex items-center justify-center flex-col grow">
                    <div className="sticky w-full top-10 md:top-0 h-0 flex justify-between z-[999]">
                        <div className="m-2 font-bold text-base text-slate">
                            <div className="flex items-center justify-center">
                                <PiPuzzlePieceFill /> { tilesRemaining }
                            </div>
                            <div>
                                {
                                    Object.keys(scores).map(k =>
                                        <div key={k} className="flex items-center h-full">
                                            <div className={`mr-1 w-3 h-3 bg-${k} rounded-full`}/>
                                            <div className="h-full">{scores[k]}</div>
                                        </div>)
                                }
                            </div>
                        </div>
                        <div className="m-2">
                            <div onClick={ zoomIn } className="rounded-full w-10 h-10 bg-slate cursor-pointer font-bold text-3xl flex items-center justify-center mb-2 select-none">+</div>
                            <div onClick={ zoomOut } className="rounded-full w-10 h-10 bg-slate cursor-pointer font-bold text-3xl flex items-center justify-center select-none">-</div>
                        </div>
                    </div>
                    <div className="relative overflow-auto w-full flex items-center justify-center flex-col grow no-scrollbar">
                        <div className="absolute top-0 left-0 flex items-center justify-center flex-col min-w-full min-h-full">
                        {
                            Array.from({ length: maxY-minY+1 }, (_, y) => maxY+y*-1).map(y =>
                                <div key={ y } className="flex">
                                {
                                    Array.from({ length: maxX-minX+1 }, (_, x) => x+minX).map(x =>
                                        <div key={ `${x}${y}` } className={ 
                                                lastPlacedTiles && Object.keys(lastPlacedTiles).find(k => lastPlacedTiles[k] && lastPlacedTiles[k].x == x && lastPlacedTiles[k].y == y) ? `box-border border-2 border-${ Object.keys(lastPlacedTiles).find((k) => lastPlacedTiles[k] && lastPlacedTiles[k].x == x && lastPlacedTiles[k].y == y) }` : "" 
                                            } style={{ width: tileSize*zoom, height: tileSize*zoom }}>
                                        {
                                            xyToPlaceable[`${ x }${ y }`] ?
                                                <TileDropSpace x={ x } y={ y } team={ team } /> :
                                                xyToTile[`${ x }${ y }`] ?
                                                    <Tile x={ xyToTile[`${x}${y}`].x } y={ xyToTile[`${x}${y}`].y }
                                                            tile={{
                                                                sides: {
                                                                    top: {
                                                                        structure: xyToTile[`${x}${y}`].sides[TOP],
                                                                        colors: xyToTile[`${x}${y}`].teams[TOP] ? xyToTile[`${x}${y}`].teams[TOP].map((team) => COLORMAP[team]) : []
                                                                    },
                                                                    right: {
                                                                        structure: xyToTile[`${x}${y}`].sides[RIGHT],
                                                                        colors: xyToTile[`${x}${y}`].teams[RIGHT] ? xyToTile[`${x}${y}`].teams[RIGHT].map((team) => COLORMAP[team]) : []
                                                                    },
                                                                    bottom: {
                                                                        structure: xyToTile[`${x}${y}`].sides[BOTTOM],
                                                                        colors: xyToTile[`${x}${y}`].teams[BOTTOM] ? xyToTile[`${x}${y}`].teams[BOTTOM].map((team) => COLORMAP[team]) : []
                                                                    },
                                                                    left: {
                                                                        structure: xyToTile[`${x}${y}`].sides[LEFT],
                                                                        colors: xyToTile[`${x}${y}`].teams[LEFT] ? xyToTile[`${x}${y}`].teams[LEFT].map((team) => COLORMAP[team]) : []
                                                                    },
                                                                    center: {
                                                                        structure: xyToTile[`${x}${y}`].center,
                                                                        colors: xyToTile[`${x}${y}`].center_team ? [xyToTile[`${x}${y}`].center_team].map((team) => COLORMAP[team]) : []
                                                                    },
                                                                    topa: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[TOPA] ? xyToTile[`${x}${y}`].farm_teams[TOPA].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    topb: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[TOPB] ? xyToTile[`${x}${y}`].farm_teams[TOPB].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    righta: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[RIGHTA] ? xyToTile[`${x}${y}`].farm_teams[RIGHTA].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    rightb: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[RIGHTB] ? xyToTile[`${x}${y}`].farm_teams[RIGHTB].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    bottoma: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[BOTTOMA] ? xyToTile[`${x}${y}`].farm_teams[BOTTOMA].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    bottomb: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[BOTTOMB] ? xyToTile[`${x}${y}`].farm_teams[BOTTOMB].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    lefta: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[LEFTA] ? xyToTile[`${x}${y}`].farm_teams[LEFTA].map((team) => COLORMAP[team]) : [],
                                                                    },
                                                                    leftb: {
                                                                        structure: FARM,
                                                                        colors: xyToTile[`${x}${y}`].farm_teams[LEFTB] ? xyToTile[`${x}${y}`].farm_teams[LEFTB].map((team) => COLORMAP[team]) : [],
                                                                    }
                                                                },
                                                                connected_cities: xyToTile[`${x}${y}`].connected_cities,
                                                                banner: xyToTile[`${x}${y}`].banner
                                                            }}
                                                            token={ boardTokens.reduce((acc, token) => acc ? acc : (token.x == x && token.y == y ? { side: token.side, color: COLORMAP[token.team] } : undefined), undefined) }
                                                            tokenDroppable={ winners.length === 0 && !playTile && lastPlacedTiles && lastPlacedTiles[turn] && lastPlacedTiles[turn].x === xyToTile[`${x}${y}`].x && lastPlacedTiles[turn].y === xyToTile[`${x}${y}`].y }
                                                            hoverColor={ COLORMAP[team] }
                                                    /> : null
                                        }
                                        </div>)
                                }
                                </div>)
                        }
                        </div>
                    </div>
                </div>

                <div className="my-4 w-full flex justify-center items-center" style={{ minHeight: tileSize }}>
                    {
                        turn === team && !playTile ? 
                            <>
                                <div className="flex items-center">
                                    <div className="mr-2 font-bold text-slate">{ team ? tokens[team] : "0" }</div>
                                    <div style={{ width: tileSize/6, height: tileSize/6 }}>
                                        <DraggableToken id={ "token" } size={ tileSize/6 } team={ team } 
                                            scrollX={ scrollX } scrollY={ scrollY } />
                                    </div>
                                </div>
                                <div className="ml-8 px-4 py-2 text-sm font-bold bg-dark-500 text-slate cursor-pointer rounded-md" onClick={ () => pass() }>
                                    pass
                                </div>
                            </> :
                            <>
                                <div className="box-border border border-slate" style={{ width: tileSize, height: tileSize }}>
                                    {
                                        playTile ?
                                            <div className="w-full h-full cursor-pointer" onClick={ () => winners.length === 0 ? rotateTile() : null }>
                                                <DraggableTile x={ playTile.x } y={ playTile.y } 
                                                        tile={{
                                                            sides: {
                                                                top: {
                                                                    structure: playTile.sides[TOP],
                                                                    colors: []
                                                                },
                                                                right: {
                                                                    structure: playTile.sides[RIGHT],
                                                                    colors: []
                                                                },
                                                                bottom: {
                                                                    structure: playTile.sides[BOTTOM],
                                                                    colors: []
                                                                },
                                                                left: {
                                                                    structure: playTile.sides[LEFT],
                                                                    colors: []
                                                                },
                                                                center: {
                                                                    structure: playTile.center,
                                                                    colors: []
                                                                }
                                                            },
                                                            connected_cities: playTile.connected_cities,
                                                            banner: playTile.banner
                                                        }}
                                                        token={ undefined }
                                                        tokenDroppable={ false }
                                                        team={ team } 
                                                        scrollX={ scrollX } scrollY={ scrollY } /> 
                                            </div> : null
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </DndContext>
    )
})
