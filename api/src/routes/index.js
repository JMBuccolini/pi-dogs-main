const { Router } = require('express');
const breedsRoutes = require('./breedsRoutes')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', breedsRoutes)

module.exports = router;
