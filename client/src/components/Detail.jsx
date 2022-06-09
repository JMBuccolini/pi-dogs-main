import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getDetail } from "../actions";
import { useEffect } from "react";
import '../styles/detail.css'

export default function Detail(){
const {id} = useParams();
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getDetail(id))
},[dispatch])


const myDog = useSelector((state)=> state.detail)

return(
    <div className="card_detail">
        {
            myDog.length > 0? 
            <div className="card_detail_content">
                <img src={myDog[0].image?myDog[0].image:'https://acortar.link/PZdlEx'}/>
                <h1>Nombre: {myDog[0].name}</h1>
                <h3>Temperament: {myDog[0].temperament}</h3>
                <h3>Altura: {myDog[0].height}ctms</h3>
                <h3>Peso: min: {myDog[0].weight[0]}kg max: {myDog[0].weight[1]}kg</h3>
                <h3>Años de vida: {myDog[0].life_span}</h3>
            </div> : <p>...Cargando</p>
        }
        <Link to='/home'><button className="card_home_button">Volver</button></Link>
    </div>
)

}








