import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDogs } from '../actions';
import {Link} from 'react-router-dom'
import DogCard from './DogCard';
import Paginado from './Paginado';


export default function Home(){

const dispatch = useDispatch()
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

return(
    <div>
        <Link to= '/dog'> Crea tu Perro</Link>
        <h1> HENRY Dogs</h1>
        <button onClick={e => {handleClick(e)}}>
            Dogs
        </button>
    <div>
        <select>
            <option value= 'asc'> Ascendente</option>
            <option value='desc'> Descendente</option>
        </select>
        <select>
            <option value= 'pesomax'> Peso Max - Min</option>
            <option value='pesomin'> Peso Min - Max</option>
        </select>
        <select>
            <option value='api'>Todos los Perros</option>
            <option value='api'>Raza existente</option>
            <option value='created'>Raza creada por usuario</option>
        </select>
        <Paginado
        dogsPage={dogsPage}
        allDogs={allDogs.length}
        pages={pages}
        />
     {currentDogs ?.map((e) =>{
         return(

             <DogCard name={e.name} image = {e.image} weight={e.weight} height={e.height} life_span={e.life_span} />   

         )})
    }
    </div>
    </div>
)




}