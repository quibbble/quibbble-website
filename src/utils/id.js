import { Nouns } from "./nouns"
import { Adjectives } from "./adjectives"

export const CreateID = () => {
    const adj = Adjectives[Math.floor(Math.random()*Adjectives.length)]
    const noun = Nouns[Math.floor(Math.random()*Nouns.length)]
    const num = Math.floor(Math.random() * (999 + 1))
    return `${ adj }-${ noun }-${ num }`
}
