
const initialState = {
    dogs : [],
    allDogs: [],
    temperaments : [],
    detail: []
    

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
            const allDogs1 = state.allDogs; //tiene el backup de todos los perros
            const originFiltered = action.payload === "DB"? allDogs1.filter(d=>d.createdInDB) : allDogs1.filter(d=>!d.createdInDB)
            //si DB entonces of tiene solamente los DB, sino solamente a los que no tienen DB o sea API
            return{
                ...state,
                dogs: action.payload === "All"? state.allDogs : originFiltered //si ALL entonces backup state allDogs
                }
            case 'FILTER_BY_TEMPERAMENT':
            //dogs vale originfiltered que tiene los perros de la DB
            let allDogs2 = state.allDogs;
            allDogs2 = allDogs2.filter(e=>e.temperament!==undefined)
            const tempFiltered = allDogs2.filter(e => e.temperament.includes(action.payload))
            return{
                ...state,
                dogs: tempFiltered
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
            case 'ORDER_BY_WEIGHT':
                const dogsWeight = action.payload ==='pesomin'?
                state.dogs.sort(function(a,b){
                    if(a.weight[0]>b.weight[0]){
                        return 1;}
                    if(b.weight[0] > a.weight[0]){return -1;}
                    return 0;
                }):
                state.dogs.sort(function(a,b){
                    if(a.weight[1]>b.weight[1]){return -1;}
                    if(b.weight[1]>a.weight[1]){return 1;}
                    
                })
                    return{
                        ...state,
                        dogs:dogsWeight
                    } 
                case 'POST_DOG':
                    return{
                        ...state
                    }
                case 'GET_DETAIL':
                    return{
                        ...state,
                        detail: action.payload
                    }
                case 'GET_TEMPERAMENTS':
                    return{
                        ...state,
                        temperaments: action.payload,
                        
                    }


            default:
                return state;
    }
}


export default rootReducer;