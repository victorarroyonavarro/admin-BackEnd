const Usuario = require('../models/usuarios.model');
const {response} = require('express')
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');


const login = async (req, res = response) => {
    const {email, password} = req.body;

    const usuarioDB = await Usuario.findOne({email});
    // verificar emial
    if (!usuarioDB) {
        return res.status(400).json({Ok: false, msg: "Email no válido!!"});
    }

    // verfificar contraseña
    const validaPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (! validaPassword) {
        return res.status(400).json({Ok: false, msg: "Constreña no válida!!"});
    }

    // Generar Token
    const token=await generarJwt(usuarioDB.id,usuarioDB.nombre);

    try {
        res.json({Ok: true, token});
    } catch (error) {
        console.log(error)
        res.status(500).json({"Ok": false, "msg": "Error al logear usuario...."});

    }

}

module.exports = {
    login
}
