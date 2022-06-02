import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import { getDogTemperaments, postDog } from '../actions';

export default function DogCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const navigate = useNavigate()

    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
        image:""
    })

function handleChange(e){
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    console.log(input)
}

function handleSelect(e){
    e.preventDefault()
    setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
    })
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(postDog(input))
    alert("Perrito creado")
    setInput({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
        image:""
       
    })
    navigate("/home")
}


useEffect(()=>{
    dispatch(getDogTemperaments())
},[]);

return(

    <div>
        <Link to='/home'><button>Volver a Home</button></Link>
        <h1>Crea a tu perrito</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label>Nombre:</label>
                <input type='text' value={input.name} name='name' onChange={(e) =>handleChange(e)}/>
            </div>
            <div>
                <label>Altura:</label>
                <input type= 'text' value={input.height} name='height' onChange={(e) =>handleChange(e)}/>
            </div>
            <div>
                <label>Peso:</label>
                <input type='text' value={input.weight} name='weight' onChange={(e) =>handleChange(e)}/>
            </div>
            <div>
                <label>Promedio de vida</label>
                <input type='text' value={input.life_span} name='life_span' onChange={(e) =>handleChange(e)}/>
            </div>
            <div>
                <label>Imagen</label>
                <input type='text' value={input.image} name='image' onChange={(e) =>handleChange(e)}/>
            </div>
            <label>Temperamentos: </label>
            <select onChange={(e)=>handleSelect(e)}>
                {temperaments.map((temp) =>(  
                    <option value={temp.name}>{temp.name}</option>
                ))}
            </select>
            <ul><li>Has seleccionado: {input.temperament.map(el =>el + " ,")}</li></ul>
            
            <div>
                <button type='submit'>Crear Perrito</button>
            </div>

        </form>


    </div>


)

}
