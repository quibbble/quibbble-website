import axios from 'axios';
import { CreateID } from '../utils/id';

axios.defaults.withCredentials = true;

const host = import.meta.env.VITE_QUIBBBLE_HOST

export const createGame = async (key, id, teams, variant, kind) => {

    const name = localStorage.getItem("name")

    let colors = [
        "red", "blue", "green", "yellow", "orange", "pink", "purple", "teal"
    ]

    let qgn = `
        [key "${ key }"]
        [id "${ id }"]
        [teams "${ colors.slice(0, teams).join(", ") }"]
        [kind "${ kind }"]
        ${ variant ? `[variant "${ variant }"]` : `` }
    `

    let config = {
        method: 'POST',
        url: `https://${ host }/game?name=${ name }`,
        data: qgn
    };
    return axios(config)
        .catch(error => error.response)
}

export const GetSnapshot = async (gameKey, gameId) => {
    let config = {
        method: 'GET',
        url: `https://${ host }/${ gameKey }/${ gameId }/snapshot?format=json`,
    };
    return axios(config)
        .catch(error => error.response)
}

export const GetActivity = async () => {
    let config = {
        method: 'GET',
        url: `https://${ host }/game/activity`,
    };
    return axios(config)
        .catch(error => error.response)
}

export const Health = async () => {
    let config = {
        method: 'GET',
        url: `https://${ host }/health`,
    };
    return axios(config)
        .catch(error => error.response)
}
