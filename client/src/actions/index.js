import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var dogs = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: 'GET_DOGS',
            payload: dogs.data
        })
    }
}

export function filterDogByOrigin(payload){
    return ({
        type: "FILTER_BY_ORIGIN",
        payload
    })
}

export function orderByName(payload){
    return({
        type: "ORDER_BY_NAME",
        payload
    })
}