import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterDogByOrigin, orderDogByWeight, getDogs, orderByName, getDogTemperaments,filterDogByTemperament } from '../actions';
import {Link} from 'react-router-dom'
import DogCard from './DogCard';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import '../styles/home.css'
import Navbar from './Navbar';


export default function Home(){

const dispatch = useDispatch()
const [orden, setOrden] = useState('')
const allDogs = useSelector((state)=>state.dogs) //con esto reemplazamos el mapstatetoprops, trae todo lo que esté en el estado de dogs
const temperaments = useSelector((state) => state.temperaments)
//Paginado:
const [currentPage, setCurrentPage] = useState(1) //guardamos en un estado la pagina actual
const [dogsPage, setdogsPage] = useState(8) //guardamos los personajes por pagina
const indexLastDog = currentPage * dogsPage //esta constante inicia en 8
const indexFirstDog = indexLastDog - dogsPage //el 1er perro está la pos final menos la cantidad de perros
const currentDogs= allDogs.slice(indexFirstDog,indexLastDog) // me devuelve los 8 perros ya que el slice no toma el ultimo

const pages= (pageNumber) =>{
    setCurrentPage(pageNumber)
}
//Fin paginado

useEffect(()=>{
    dispatch(getDogs())
    dispatch(getDogTemperaments())
},[]);


function handlefilterDogByOrigin(e){
    e.preventDefault();
    dispatch(filterDogByOrigin(e.target.value))
    setCurrentPage(1);
    
}

function handlefilterDogByName(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${e.target.value}`)
}

function handlefilterDogByWeight(e){
    e.preventDefault();
    dispatch(orderDogByWeight(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handlefilterDogByTemperament(e){
    e.preventDefault()
    dispatch(filterDogByTemperament(e.target.value))
}


return(
    <div className='home_div'>
        <Navbar/>
        <h1 className='home_title'> Los mejores amigos del hombre</h1>
        <Link to= '/dog' className='form_button'> Crea tu Perro</Link>
        <SearchBar/>
        <div className="contenedor">
        <div className='filtro_nombre'>
            <p className='p_filtros'>Filtrar por Nombre</p>
            <select  onChange={(e) => handlefilterDogByName(e)}>
                <option value= 'asc'> Ordenar de la A-Z</option>
                <option value='desc'> Ordenar de la Z-A</option>
            </select>

        </div>
        <div className='filtro_peso'>
            <p className='p_filtros'>Filtrar por peso</p>
            <select onChange={(e) => handlefilterDogByWeight(e)}>
                <option value= 'pesomax'> Peso Max - Min</option>
                <option value='pesomin'> Peso Min - Max</option>
            </select>

        </div>
        <div className='filtro_temperamento'>
            <p className='p_filtros'>Filtrar por Temperamento</p>
            <select onChange={(e) => handlefilterDogByTemperament(e)}>
                    {temperaments.map((temp) =>(  
                        <option value={temp.name}>{temp.name}</option>
                    ))}
            </select>

        </div>
        <div className='filtro_origen'>

            <p className='p_filtros'>Filtrar por Origen</p>
            <select onChange={(e) => handlefilterDogByOrigin(e)}>
                <option value='All'>Todos</option>
                <option value='API'>Razas de la API</option>
                <option value='DB'>Razas creada por usuario</option>
            </select>
        </div>
        </div>
        <Paginado
        dogsPage={dogsPage}
        allDogs={allDogs.length}
        pages={pages}
        />
     {currentDogs ?.map((e) =>{
         return(
            
                
                <DogCard name={e.name} id ={e.id} image = {e.image?e.image: 'https://acortar.link/PZdlEx'} temperament = {e.temperament}weight={e.weight}  key={e.id}/>  

            
            
         )})
    }
    </div>

    
)




}