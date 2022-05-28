/*
Ruta: /api/medicos
*/

const {validarCampos} = require('../middlewares/validar-campos');
const {check} = require('express-validator');
const {Router} = require('express');
const {validarJwt} = require('../middlewares/validar-jwt');
const router = Router();

const { crearMedico,actualizarMedico,getMedicos,borrarMedico } =require('../controllers/medicos.controller');


router.get('/', getMedicos);


router.post('/',
 [
   validarJwt,
   check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
   check('hospital', 'El hospital id tiene que ser válido').isMongoId(),
   validarCampos
], crearMedico);




module.exports = router;
