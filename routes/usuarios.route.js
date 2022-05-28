/*
Ruta: /api/usuarios
*/
const {validarCampos} = require("../middlewares/validar-campos");
const {check} = require("express-validator");
const {Router} = require("express");

const {getUsuarios, crearUsuarios, actualizarUsuario, borrarUsuario} = require("../controllers/usuarios.controller");
const {validarJwt} = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", validarJwt, getUsuarios);

router.post("/", [
   //validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Debe ser email").isEmail(),
    validarCampos,
], crearUsuarios);


router.put("/:id", [
    validarJwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty(),
    check("email", "Debe ser email").isEmail(),
    check("email", "Debe ser email").not().isEmpty(),
    validarCampos,
], actualizarUsuario);

router.delete("/:id", validarJwt, borrarUsuario);

module.exports = router;
