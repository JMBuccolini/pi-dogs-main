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

export function getDogByName(payload){
    return async function(dispatch){
        try {
            var dogName= await axios.get(`http://localhost:3001/dogs?name=${payload}`)
            
            return dispatch({
                type: 'GET_DOGS_NAME',
                payload: dogName.data
            })
            
        } catch (error) {
            alert('No existe un perro con ese nombre')
        }
    }
}

export function getDogTemperaments(){
    return async function(dispatch){
        var dogTemper = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: dogTemper.data
    })
  } 
}

export function getDetail(id){
    return async function(dispatch){
        try {
            var dogDetail = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: 'GET_DETAIL',
                payload: dogDetail.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog(payload){
    return async function(){
        var dogPost = await axios.post("http://localhost:3001/dog", payload)
        return dogPost
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

export function filterDogWeight10(payload){
    return({
        type:"FILTER_WEIGHT10",
        payload
    })
}
export function orderDogByWeight(payload){
    return({
        type: "ORDER_BY_WEIGHT",
        payload
    })
}

export function filterDogByTemperament(payload){
    return({
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    })
}