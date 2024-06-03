import React, { useEffect, useState, forwardRef, useCallback } from "react";

export const Connect4 = forwardRef((props, ref) => {

    const { game, send } = props;

    const place = (col) => send({"type": "place", "details": {"col": col}});

    const [board, setBoard] = useState([
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null]]);
    useEffect(() => {
        if (game && game.snapshot && game.snapshot.details && game.snapshot.details.board) setBoard(game.snapshot.details.board)
    }, [game.snapshot])

    // board must stay at a 7x6 width to height ratio
    const [tileSize, setTileSize] = useState(0);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const handleResize = useCallback(() => {
        const width = 7.5;
        const height = 6.5;
        const scale = 0.8;
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
            <div className="bg-[#418dff] flex flex-col justify-center rounded-3xl overflow-hidden bg-slate-200" style={{width: `${width}px`, height: `${height}px`}}>
            {
                board.map((row, rIdx) =>
                    <div key={rIdx} className="flex justify-center w-full" style={{height: `${tileSize}px`}}>
                        {
                            row.map((token, cIdx) =>
                            <div key={`${rIdx},${cIdx}`} className="flex items-center justify-center cursor-pointer" style={{width: `${tileSize}px`, height: `${tileSize}px`}} onClick={() => place(cIdx)}>
                                <div className={`w-[90%] h-[90%] rounded-full ${token ? `bg-${token}` : "bg-dark-900"}`}/>
                            </div>)
                        }
                    </div>
                )
            }
            </div>
        </div>
    )
})