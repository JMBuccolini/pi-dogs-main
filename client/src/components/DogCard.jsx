import React from "react";
import { Link } from "react-router-dom";
import '../styles/card.css'

export default function DogCard({name, id , image, weight, temperament}){
    return (

        <div className="card" key={id}>
            <img src={image} alt='imagen no encontrada' width='400px' height='250px' />
            <h2>Nombre: {name}</h2>
            <h3>Temperamento: {temperament}</h3>
            <h3>Peso: min: {weight[0]} max: {weight[1]}</h3>
            <Link to={'/detail/' + id}><button>Detail</button></Link> 
        </div>

    );
}