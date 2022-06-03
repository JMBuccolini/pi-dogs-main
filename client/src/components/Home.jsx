import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterDogByOrigin, filterDogByWeight, getDogs, orderByName } from '../actions';
import {Link} from 'react-router-dom'
import DogCard from './DogCard';
import Paginado from './Paginado';
import SearchBar from './SearchBar';


export default function Home(){

const dispatch = useDispatch()
const [orden, setOrden] = useState('')
const allDogs = useSelector((state)=>state.dogs) //con esto reemplazamos el mapstatetoprops, trae todo lo que esté en el estado de dogs
const [currentPage, setCurrentPage] = useState(1) //guardamos en un estado la pagina actual
const [dogsPage, setdogsPage] = useState(8) //guardamos los personajes por pagina
const indexLastDog = currentPage * dogsPage //esta constante inicia en 8
const indexFirstDog = indexLastDog - dogsPage //el 1er perro está la pos final menos la cantidad de perros
const currentDogs= allDogs.slice(indexFirstDog,indexLastDog) // me devuelve los 8 perros ya que el slice no toma el ultimo

const pages= (pageNumber) =>{
    setCurrentPage(pageNumber)
}




useEffect(()=>{ 
    dispatch(getDogs());    
}, [])

function handleClick(e){
    e.preventDefault();
    dispatch(getDogs());
}

function handlefilterDogByOrigin(e){
    e.preventDefault();
    dispatch(filterDogByOrigin(e.target.value))
    setCurrentPage(1);
    
}

function handlefilterDogByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Òrdenado ${e.target.value}`)
}

function handlefilterDogByWeight(e){
    e.preventDefault();
    dispatch(filterDogByWeight(e.target.value))
    setCurrentPage(1);
}


return(
    <div>
        <Link to= '/dog'> Crea tu Perro</Link>
        <h1> Los mejores amigos del hombre</h1>
        <SearchBar/>
        <button onClick={e => {handleClick(e)}}>
            Dogs
        </button>
    <div>
        <select  onChange={(e) => handlefilterDogByName(e)}>
            <option value= 'asc'> Ordenar de la A-Z</option>
            <option value='desc'> Ordenar de la Z-A</option>
        </select>
        <select onChange={(e) => handlefilterDogByWeight(e)}>
            <option value= 'pesomax'> Peso Max - Min</option>
            <option value='pesomin'> Peso Min - Max</option>
        </select>
        <select onChange={(e) => handlefilterDogByOrigin(e)}>
            <option value='All'>Todos</option>
            <option value='API'>Razas de la API</option>
            <option value='DB'>Razas creada por usuario</option>
        </select>
        <Paginado
        dogsPage={dogsPage}
        allDogs={allDogs.length}
        pages={pages}
        />
     {currentDogs ?.map((e) =>{
         return(

             <DogCard name={e.name} image = {e.image} temperament = {e.temperament}weight={e.weight} />   

         )})
    }
    </div>
    </div>
)




}