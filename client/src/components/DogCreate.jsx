import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link,useNavigate} from 'react-router-dom';
import { getDogTemperaments, postDog } from '../actions';

function validate(input){
    let errors = {};
  
    if (!input.name || !/^[A-Za-z\s]+$/g.test(input.name)){
        errors.name = 'El nombre solo puede tener letras';
    }
 
    if(!input.height_min || !/^[1-9]\d*(\.\d+)?$/.test(input.height_min)){
        errors.height_min = 'Solo puede ser un valor numérico';
    }
    if(!input.height_max || !/^[1-9]\d*(\.\d+)?$/.test(input.height_max)){
        errors.height_max = 'Solo puede ser un valor numérico';
    }
    if(input.height_max <= input.height_min){
        errors.height_min = 'La altura máxima no puede ser menor o igual a la minima';
    }
    
    if(!input.weight_min || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_min)){
        errors.weight_min = 'Solo puede ser un valor numérico';
    }
    if(!input.weight_max || !/^[1-9]\d*(\.\d+)?$/.test(input.weight_max)){
        errors.weight_max = 'Solo puede ser un valor numérico';
    }
    if(input.weight_max <= input.weight_min){
        errors.weight_min = 'El peso máximo no puede ser menor al mínimo';
    }
    if(!input.life_span || !/^[1-9]\d*(\.\d+)?$/.test(input.life_span)){
        errors.life_span = 'Solo puede ser un valor numérico';
    }
    
    if (input.image && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.image) ){
        errors.image = 'Debe ser una URL o dejarlo vacío para utilizar la imagen por default';
    }
    return errors
}




export default function DogCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})

    const [minmax, setMinmax] = useState({
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:""
    })
    
    const [input, setInput] = useState({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
        image:""
    })

    function handleSelect(e){
        setInput({
            ...input,
            temperament: input.temperament.includes(e.target.value)? (alert('Temperamento ya agregado'),[...input.temperament]): [...input.temperament, e.target.value],
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
function handleChange(e){
    e.preventDefault()
    setMinmax({
        ...minmax,
        [e.target.name] : e.target.value
    })
    setInput({
        ...input,
        [e.target.name] : e.target.value,   
        height: minmax.height_min +'-'+  minmax.height_max,
        weight: minmax.weight_min + '-' + minmax.weight_max
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
    
}


function handleSubmit(e){
    e.preventDefault()
    
    if( Object.keys(errors).length === 0 && input.temperament.length > 0)
    {dispatch(postDog(input));
    setMinmax({
        height_min:"",
        height_max:"",
        weight_min:"",
        weight_max:""
    })
    setInput({
        name: "",
        height: "",
        weight: "",
        life_span: "",
        temperament: [],
        image:""
        
    })
    alert("Perrito creado")
    navigate("/home")}
    else{alert("Debe completar todos los campos como corresponde")}
}

function handleDelete(e){
    setInput({
        ...input,
        temperament: input.temperament.filter(t=> t !== e)
    })
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
                {errors.name && (<p>{errors.name}</p>)}
            </div>
            
            <div>
                <label>Altura minima:</label>
                <input type= 'text' value={minmax.height_min} name='height_min' onChange={handleChange}/>
                {errors.height_min && (<p>{errors.height_min}</p>)}
            </div>
            <div>
                <label>Altura maxima:</label>
                <input type= 'text' value={minmax.height_max} name='height_max' onChange={(e) =>handleChange(e)}/>
                {errors.height_max && (<p>{errors.height_max}</p>)}
            </div>
            <div>
                <label>Peso minimo:</label>
                <input type='text' value={minmax.weight_min} name='weight_min' onChange={(e) =>handleChange(e)}/>
                {errors.weight_min && (<p>{errors.weight_min}</p>)}
            </div>
            <div>
                <label>Peso maximo:</label>
                <input type='text' value={minmax.weight_max} name='weight_max' onChange={(e) =>handleChange(e)}/>
                {errors.weight_max && (<p>{errors.weight_max}</p>)}
            </div>
            <div>
                <label>Promedio de vida</label>
                <input type='text' value={input.life_span} name='life_span' onChange={(e) =>handleChange(e)}/>
                {errors.life_span && (<p>{errors.life_span}</p>)}
            </div>
            <div>
                <label>Imagen</label>
                <input type='text' value={input.image} name='image' onChange={(e) =>handleChange(e)}/>
                {errors.image && (<p>{errors.image}</p>)}
             
            </div>
            <label>Temperamentos (debes elegir por lo menos uno): </label>
            <select onChange={(e)=>handleSelect(e)}>
                {temperaments && temperaments.map((temp) =>(  
                    <option value={temp.name}>{temp.name}</option>
                    ))}
            </select>
            <ul><li>Has seleccionado: {input.temperament.map(el =>el + " ,")}</li></ul>
            
            <div>
                <button type='submit'>Crear Perrito</button>
            </div>

        </form>
        {
            input.temperament.map(e=>
                <div>
                <p>{e}</p>
                <button onClick={()=>handleDelete(e)}>x</button>
                </div>
        )}


    </div>


)

}
