const axios= require('axios')
const Race = require('../models/Race')


async function getAllBreeds(req,res,next){
    try {
        let breeds= (await axios('https://api.thedogapi.com/v1/breeds?api_key=58e889c2-6c68-4943-843c-6cd982c402a7')).data.
        map(e=>({image:e.image.url, name:e.name, temperament:e.temperament,weigth:e.weight.metric})) 
        res.send(breeds)
    } catch (error) {
        next(error)
    }
}

module.exports={
    getAllBreeds
}