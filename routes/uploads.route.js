/*
Ruta: /api/uploads
*/
const {Router} = require('express');
const expressFileUpload = require('express-fileupload');

const {validarJwt} = require('../middlewares/validar-jwt');
const { fileUploads,retornaImagen } =require('../controllers/uploads.controller');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJwt,fileUploads );

router.get('/:tipo/:foto', validarJwt,retornaImagen );

module.exports = router;