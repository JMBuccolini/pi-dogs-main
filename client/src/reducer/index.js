
const initialState = {
    dogs : [],
    allDogs: []
    

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

            default:
                return state;
    }
}


export default rootReducer;