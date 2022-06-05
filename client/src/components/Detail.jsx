import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";

export default function Detail(){
const {id} = useParams();
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch])


const myDog = useSelector((state)=> state.detail)

return(
    <div>
        {
            myDog.length > 0? 
            <div>
                <img src={myDog[0].image}/>
                <h1>Nombre: {myDog[0].name}</h1>
                <h3>Temperament: {myDog[0].temperament}</h3>
                <h3>Altura: {myDog[0].height}</h3>
                <h3>Peso: {myDog[0].weight}</h3>
                <h3>Años de vida: {myDog[0].life_span}</h3>


            </div> : <p>No hay perros con ese ID</p>
        }
        <Link to='/home'>
            <button>Volver</button>
        </Link>
    </div>
)

}








