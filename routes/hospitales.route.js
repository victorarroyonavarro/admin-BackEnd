/*
Ruta: /api/hospitales
*/

const {validarCampos} = require('../middlewares/validar-campos');
const {check} = require('express-validator');
const {Router} = require('express');
const {validarJwt} = require('../middlewares/validar-jwt');
const router = Router();

const { crearHospital,actualizarHospitales,getHospitales,borrarHospitales } =require('../controllers/hospitales.controller');

router.get('/', getHospitales);


router.post('/',
 [
   validarJwt,
   check('nombre', 'El nombre del hospital es obligatorio').not().isEmpty(),
   validarCampos
], crearHospital);


router.put('/:id', actualizarHospitales);


router.delete('/:id', borrarHospitales);

module.exports = router;
