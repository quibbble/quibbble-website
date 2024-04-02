import axios from 'axios';

axios.defaults.withCredentials = true;

export const GetSnapshot = async (host, gameKey, gameId) => {
    let config = {
        method: 'GET',
        url: `${ host }/${ gameKey }/${ gameId }/snapshot?format=json`,
    };
    return axios(config)
        .catch(error => error.response)
}

export const Health = async (host) => {
    let config = {
        method: 'GET',
        url: `${ host }/health`,
    };
    return axios(config)
        .catch(error => error.response)
}
