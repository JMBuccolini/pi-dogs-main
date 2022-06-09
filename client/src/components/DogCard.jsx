import React from "react";
import { Link } from "react-router-dom";
import '../styles/card.css'

export default function DogCard({name, id , image, weight, temperament}){
    return (

        <div className="card" key={id}>
            <div className="card_content">
            <img src={image} alt='imagen no encontrada' />
           
                <h2>Nombre: {name}</h2>
                <h3>Temperamento: {temperament}</h3>
                <h3>Peso: min: {weight[0]}kg max: {weight[1]}kg</h3>
                <Link to={'/detail/' + id}><button className="detail_button">+Info</button></Link> 

            </div>

            
        </div>

    );
}