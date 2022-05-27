const { Router } = require('express');
const axios= require('axios')
const {Race, Temperament} = require('../db')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



async function getApiBreeds(){
    try {
        let breeds= (await axios('https://api.thedogapi.com/v1/breeds?api_key=58e889c2-6c68-4943-843c-6cd982c402a7')).data.
        map(e=>({image:e.image.url, name:e.name, temperament:e.temperament,weigth:e.weight.metric}))
        return breeds
    } catch (error) {
        next()
    }
}

async function getDbBreeds(){
    try {
        return await Race.findAll({
            include:{
                model: Temperament,
                attributes: ['name'],
                through:{
                    attributes: []
                }
            }
        })
    } catch (error) {
        next()
    }
}

async function getAllBreeds(){
    const apiBreeds= await getApiBreeds()
    const dbBreeds= await getDbBreeds()
    const allBreeds= apiBreeds.concat(dbBreeds);
    return allBreeds 
}

router.get("/dogs", async(req,res)=>{
    const name = req.query.name
    let totalBreeds = await getAllBreeds();
    if(name){
        let breedName = await totalBreeds.filter(e=> e.name.toLowerCase().includes(name.toLowerCase()));
        breedName.length ? res.status(200).send(breedName) : res.status(404).send("No existe una raza de perro con ese nombre");
    }else{
        res.status(200).send(totalBreeds);
    }
})

router.get('/temperament', async(req,res)=>{
    const temperamentsApi = (await axios('https://api.thedogapi.com/v1/breeds?api_key=58e889c2-6c68-4943-843c-6cd982c402a7')).data.map(e=> e.temperament).join(',')
    let arrayTemp =temperamentsApi.split(',')
       
    arrayDef = arrayTemp.reduce((acc,item)=>{
        if(!acc.includes(item) && item !=""){
            acc.push(item);       
        }
        return acc;
    },[])
    
    arrayDef.forEach(e=> {
        Temperament.findOrCreate({
            where: {name: e}
        })
    });
    const allTemperaments = await Temperament.findAll();
    res.send(allTemperaments.sort())

})



// router.get("/dogs/:id", async (req,res)=>{
//     const {id} = req.params.id
//     let totalBreeds = await getAllBreeds();
//     if(id){
//         let breedID= await totalBreeds.filter(e=> e.id === id);
//         let breedDetail = 
//     }
// })




module.exports = router;
