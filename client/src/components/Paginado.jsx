import React from 'react';
import '../styles/paginado.css'

export default function Paginado({dogsPage, allDogs, pages}){ //acá estamos creando la lista de numeros de paginas
    const pageNumbers = []
    for(let i=1; i<=Math.ceil(allDogs/dogsPage); i++){ //esta lista va a depender de la cantidad de elementos que tengamos
        pageNumbers.push(i) //aca creamos la lista en un arreglo
    }
    return(

        <nav>
            <ul className='paginado'>
                {pageNumbers && 
                pageNumbers.map(number=>(
                    <li className='pagelist' key={number}>
                        
                        <a onClick={()=>pages(number)} className='pagenumber'> {number} </a> 

                    </li>
                ))}
            </ul>
        </nav>

    )
}