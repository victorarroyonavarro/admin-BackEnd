/*
Ruta: /api/todos
*/

const {validarCampos} = require('../middlewares/validar-campos');
const {check} = require('express-validator');
const {Router} = require('express');
const {validarJwt} = require('../middlewares/validar-jwt');
const router = Router();

const { getTodos ,getDocumentoColeccion} =require('../controllers/busquedas.controller');

router.get('/:busqueda', validarJwt, getTodos);

router.get('/coleccion/:tabla/:busqueda', validarJwt, getDocumentoColeccion);


module.exports = router;