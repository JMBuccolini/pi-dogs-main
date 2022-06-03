import React from "react";

export default function DogCard({name, image, weight, temperament}){
    return (

        <div>
            <img src={image} alt='imagen no encontrada' width='400px' height='250px' />
            <h2>Nombre: {name}</h2>
            <h3>Temperamento: {temperament}</h3>
            <h3>Peso: {weight}</h3>
            
        </div>

    );
}