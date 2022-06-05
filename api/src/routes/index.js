const { Router } = require('express');
const axios= require('axios')
const {Dog, Temperament} = require('../db')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

function filterTemperament(temperament) {
    let string = "";
    for (var i = 0; i < temperament.length; i++) {
      string = string + temperament[i].name + ", ";
    }
    return string.slice(0, string.length - 2);
  }

async function getApiBreeds(){
    try {
        let breeds= (await axios('https://api.thedogapi.com/v1/breeds?api_key=58e889c2-6c68-4943-843c-6cd982c402a7')).data.
        map(e=>({id: e.id, image:e.image.url, name:e.name, height: e.height.metric, temperament:e.temperament, weight:e.weight.metric, life_span : e.life_span}))
        return breeds
    } catch (error) {
        res.status(404).send(error)
    }
}

async function getDbBreeds(){
    try {
        let dataBaseDogs = await Dog.findAll({
            include:[{
                model: Temperament,
                attributes: ["name"],
                through:{
                    attributes: []
                }
            }]
        })

        let allDogs = dataBaseDogs.map(e=>({id: e.id, image: e.image, name:e.name, height: e.height, temperament:filterTemperament(e.temperaments), weight:e.weight, life_span : e.life_span, createdInDB: e.createdInDB}))
        return allDogs
    } catch (error) {
       res.send(error)
    }
}

async function getAllBreeds(){
    const apiBreeds= await getApiBreeds()
    const dbBreeds= await getDbBreeds()
    const allBreeds= apiBreeds.concat(dbBreeds)  
    return allBreeds 
}

router.get("/dogs/:idRaza", async (req,res)=>{
    const id= req.params.idRaza;
    let totalBreeds = await getAllBreeds()
    if(id){
        let breedID= await totalBreeds.filter(e=> e.id == id);
        breedID.length ? res.send(breedID) : res.send('El id no pertenece a un perro')
    }
   
})

router.get("/dogs", async(req,res)=>{
    const name = req.query.name
    let breeds = await getAllBreeds();
    totalBreeds = breeds.map(e=> ({id:e.id,image: e.image, name: e.name, temperament: e.temperament, weight: e.weight, createdInDB: e.createdInDB}))
    if(name){
        let breedName = await totalBreeds.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()));
        breedName.length ? res.status(200).send(breedName) : res.status(404).send("No existe una raza de perro con ese nombre");
    }else{
        res.status(200).send(totalBreeds);
    }
})

router.get('/temperament', async(req,res)=>{
    const temperamentsApi = (await axios('https://api.thedogapi.com/v1/breeds?api_key=58e889c2-6c68-4943-843c-6cd982c402a7')).data.map(e=> e.temperament).join(", ")
    let arrayTemp =temperamentsApi.split(', ').sort()
     
    arrayDef = arrayTemp.reduce((acc,item)=>{
        if(!acc.includes(item) && item !=""){
            acc.push(item);       
        }
        return acc;
    },[])
    console.log(arrayDef)
      
    arrayDef.forEach(e=> {
        Temperament.findOrCreate({
            where: {name: e}
        })
    });
   
    const allTemperaments = await Temperament.findAll();
    
    res.send(allTemperaments)

})

router.post('/dog', async (req,res)=>{
    const {name, image, height, weight, temperament, life_span} = req.body
    try {
        let newDog = await Dog.create({
            name,
            height,
            weight,
            life_span,
            image
        })
        
        let temperamentNewDog = await Temperament.findAll({
             where: {name: temperament},
             
        })
        
        newDog.addTemperament(temperamentNewDog)
        
        res.send('Nuevo perro creado exitosamente')
        
    } catch (error) {
        res.status(400).send(error)
    }
    
})




module.exports = router;
