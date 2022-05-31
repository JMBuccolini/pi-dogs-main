import React from "react";

export default function DogCard({name, image, weight, height, life_span}){
    return (

        <div>
            <h2>{name}</h2>
            <img src={image} alt='imagen no encontrada' width='400px' height='250px' />
            <h3>{weight}</h3>
            <h3>{height}</h3>
            <h3>{life_span}</h3>
        </div>

    );
}