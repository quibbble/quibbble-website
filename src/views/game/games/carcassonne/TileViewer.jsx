import React, { useCallback } from "react";
import { Tile } from "./Tile";
import { DraggableToken } from "./Token";
import { DndContext, useSensors, useSensor, PointerSensor } from "@dnd-kit/core";
import { BLUE, RED } from "./models/color";
import { CITY, FARM, NIL, ROAD } from "./models/structure";
import { BOTTOMA, BOTTOMB, LEFTA, LEFTB, RIGHTA } from "./models/farmside";
import { FARMER } from "./models/token"
import { LEFT, TOP } from "./models/side";

const tile = {
    sides: { top: { structure: ROAD, colors: [RED] }, right: { structure: ROAD, colors: [] }, bottom: { structure: ROAD, colors: [] }, left: { structure: ROAD, colors: [] }, center: { structure: NIL, colors: [] }, righta: { structure: FARM, colors: [RED] }},
    connected_cities: false,
    banner: false
}
const token = null
const tokenDroppable = false

// for testing purposes only
export const TileViewer = () => {

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )
    
    const handleDragEnd = useCallback((e) => {
        if (!e.over) return 

        let over = e.over.data.current
        let active = e.active.data.current
    
        console.log(over)
        console.log(active)
    }, [])
    
    return  <>
                <DndContext autoScroll={ false } onDragEnd={ handleDragEnd } sensors={ sensors }>
                    <div className="flex flex-col items-center justify-center w-full h-screen">
                        <div className="box-border w-64 h-64 mb-12 border border-slate">
                            <Tile x={ 1 } y={ 1 } tile={ tile } tokenDroppable={ tokenDroppable } token={ token } team={ RED }  />
                        </div>
                        <DraggableToken id={1} size={"12px"} team={"red"} />
                    </div>
                </DndContext>
            </>
}
