
const initialState = {
    dogs : [],
    allDogs: [],
    temperaments : []
    

}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs : action.payload
                
            }
            case 'FILTER_BY_ORIGIN':
            const allDogs = state.allDogs;
            const originFiltered = action.payload === "DB"? allDogs.filter(d=>d.id.length>5) : allDogs.filter(d=>!d.id.length)
            return{
                ...state,
                dogs: action.payload === "All"? state.allDogs : originFiltered
                }
            case 'GET_DOGS_NAME':
                return{
                    ...state,
                    dogs: action.payload
                } 
            case 'ORDER_BY_NAME':
                const dogsName = action.payload === 'asc'?
                    state.dogs.sort(function(a,b){
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }):
                    state.dogs.sort(function (a,b){
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name>a.name){
                            return 1;
                        }
                    }) 
                    return{
                        ...state,
                        dogs: dogsName
                    }
            case 'FILTER_BY_WEIGHT':
                const dogsWeight = action.payload === 'pesomax'?
                    state.dogs.sort(function(a,b){
                        if(a.wight > b.weight){
                            return 1;
                        }
                        if(b.weight > a.weight){
                            return -1;
                        }
                        return 0;
                    }):
                    state.dogs.sort(function (a,b){
                        if(a.weight > b.weight){
                            return -1;
                        }
                        if(b.weight>a.weight){
                            return 1;
                        }
                    })
                    return{
                        ...state,
                        dogs:dogsWeight
                    } 
                case 'POST_DOG':
                    return{
                        ...state
                    }
                case 'GET_TEMPERAMENTS':
                    return{
                        ...state,
                        temperaments: action.payload
                    }


            default:
                return state;
    }
}


export default rootReducer;