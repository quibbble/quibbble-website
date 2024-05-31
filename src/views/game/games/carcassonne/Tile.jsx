import React, { forwardRef } from "react";
import TokenDropSpace from "./TokenDropSpace";
import { TILES } from "./tiles/tiles";
import { TOP, RIGHT, BOTTOM, LEFT, CENTER } from "./models/side";
import { CITY, ROAD, CLOISTER, FARM, STRUCTUREMAP } from "./models/structure";
import { CityColors, CloisterColors, FarmColors, RoadColors } from "./models/structurecolors";
import { DARK } from "./models/color";
import { useDraggable } from '@dnd-kit/core';

const defs = (tile) => {
    let l = Object.keys(tile.sides).map((side, _) => {
        let structure = tile.sides[side]
        let def = {}
        if (structure.structure === CITY) {
            let colors = CityColors(structure.colors)
            def[side] = colors
            return def
        } else if (structure.structure === ROAD) {
            let colors = RoadColors(structure.colors)
            def[side] = colors
            return def
        } else if (structure.structure === CLOISTER) {
            let colors = CloisterColors(structure.colors)
            def[side] = colors
            return def
        } else if (structure.structure === FARM) {
            if ([TOP, RIGHT, BOTTOM, LEFT].includes(side)) return {}
            let colors = FarmColors(structure.colors)
            if (colors) def[side] = colors
            return def
        }
    })
    let res = {}
    for (let it of l) Object.assign(res, it)
    return res
}

const key = (tile) => {
    let top = STRUCTUREMAP[tile.sides[TOP].structure]
    let right = STRUCTUREMAP[tile.sides[RIGHT].structure]
    let bottom = STRUCTUREMAP[tile.sides[BOTTOM].structure]
    let left = STRUCTUREMAP[tile.sides[LEFT].structure]
    let center = STRUCTUREMAP[tile.sides[CENTER].structure]
    let cityConn = tile.connected_cities ? "T" : "F"
    let banner = tile.banner ? "T" : "F"
    return top + right + bottom + left + center + cityConn + banner   
}

export const DraggableTile = ({ x, y, tile, tokenDroppable, token, hoverColor, scrollX, scrollY }) => {
    const {attributes, isDragging, listeners, setNodeRef, over, transform} = useDraggable({
        id: "tile",
        data: {
            type: "tile",
            x: x,
            y: y,
            tile: tile
        }
    });

    const style = {
        opacity: isDragging ? 0.5 : undefined,
        touchAction: "none",
        transform: transform && (transform.x != 0 || transform.y != 0) ? 
            over ? 
                `translate3d(${transform.x - scrollX}px, ${transform.y - scrollY}px, 0)` : 
                `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
    }

    return (
        <Tile ref={ setNodeRef } style={ style } 
            {...attributes} {...listeners}
            x={ x } y={ y } tile={ tile } 
            tokenDroppable={ tokenDroppable } 
            token={ token } hoverColor={ hoverColor } />
    )
}

export const Tile = forwardRef(({ x, y, tile, tokenDroppable, token, hoverColor, ...props }, ref) => {

    const definitions = defs(tile)
    const paths = TILES[key(tile)]

    return  <div ref={ ref } { ...props } name={ x + "," + y } >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
                    <defs>
                        {
                            tokenDroppable ? null :
                                Object.keys(definitions).map((side, i) => {
                                    let el = definitions[side]
                                    return el.def ? React.cloneElement(el.def, { key:  i }) : null
                                })
                        }
                    </defs>

                    { 
                        paths.map((path, i) => {
                            if (tokenDroppable) {
                                return <TokenDropSpace 
                                        key={ i } 
                                        x={ x } y={ y } 
                                        type={ path.type } 
                                        sides={ path.sides } 
                                        hoverColor={ hoverColor }
                                        el={ path.path }
                                        bbox={ path.bbox } />
                            } else {
                                let fill = path.sides.reduce((acc, side) => acc ? acc : definitions[side], undefined)
                                let opacity = fill && path.type == FARM ? 0.6 : 1
                                return React.cloneElement(
                                            path.path, 
                                            { 
                                                key: i,
                                                fill: fill ? fill.color : DARK,
                                                opacity: opacity
                                            })
                            }
                        }) 
                    }

                    { paths.map((path, i) => path.banner ? React.cloneElement(path.banner, { key: i }) : null) }

                    {
                        token ? 
                            paths.map((el, i) => el.sides.includes(token.side) ? 
                                React.cloneElement(el.token(token.color), { key: i }) : 
                                null) : 
                            null
                    }
                </svg>
            </div>
})
