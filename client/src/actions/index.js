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