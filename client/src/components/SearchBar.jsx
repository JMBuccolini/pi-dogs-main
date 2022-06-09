import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getDogByName } from '../actions';
import '../styles/searchbar.css'
export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getDogByName(name))
        setName("")
    }

    return(
        <div className='searchbar'>
            <input type='text' placeholder='Buscar perro por nombre' value={name} onChange={(e)=>handleInputChange(e)}  />
            <button type='submit' onClick={(e)=> handleSubmit(e)} >  Buscar </button>
        </div>

    )


}