import React, { useEffect, useState, forwardRef, useCallback } from "react";

export const TicTacToe = forwardRef((props, ref) => {

    const { game, send } = props;

    const sendMark = (row, col) => send({"type": "mark", "details": {"row": row, "col": col}});

    // game data
    const [board, setBoard] = useState([[null, null, null], [null, null, null], [null, null, null]]);
    useEffect(() => {
        if (game && game.snapshot && game.snapshot.details && game.snapshot.details.board) setBoard(game.snapshot.details.board)
        }, [game.snapshot])


    // board must stay at a 3x3 width to height ratio
    const [tileSize, setTileSize] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleResize = useCallback(() => {
        const width = 3;
        const height = 3;
        const scale = 0.9;
        if (!ref || !ref.current) return;
        if (ref.current.clientHeight/height < ref.current.clientWidth/width) {
            setWidth(ref.current.clientHeight/height*width*scale);
            setHeight(ref.current.clientHeight*scale);
            setTileSize(ref.current.clientHeight/height*scale);
        } else {
            setWidth(ref.current.clientWidth*scale);
            setHeight(ref.current.clientWidth/width*height*scale);
            setTileSize(ref.current.clientWidth/width*scale);
        }
    }, [ref])

    useEffect(() => handleResize());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return _ => window.removeEventListener("resize", handleResize)
    }, [handleResize]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full grow">
            <div className="flex flex-col justify-center overflow-hidden" style={{width: `${width}px`, height: `${height}px`}}>
            {
                board.map((row, rIdx) =>
                    <div key={rIdx} className="flex justify-center w-full" style={{height: `${tileSize}px`}}>
                        {
                            row.map((mark, cIdx) =>
                                <div key={`${rIdx},${cIdx}`} className="flex items-center justify-center cursor-pointer" style={{width: `${tileSize}px`, height: `${tileSize}px`}} onClick={() => sendMark(rIdx, cIdx)}>
                                    <div className={`w-full h-full flex flex-col items-center justify-center ${rIdx > 0 ? "border-t-4" : ""} ${cIdx < 2 ? "border-r-4" : ""} border-slate text-2xl  lg:text-6xl font-bold font-sans ${ mark ? `text-${ mark }` : "text-slate" }`}>{ mark ? mark.toUpperCase() : "" }</div>
                                </div>)
                        }
                    </div>
                )
            }
            </div>
        </div>
    )
})
