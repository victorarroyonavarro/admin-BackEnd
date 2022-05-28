const Usuario = require("../models/usuarios.model");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const { generarJwt } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
    const desde=Number(req.query.desde) || 0;
      
    const [usuarios,total]=await Promise.all([
        await Usuario
        .find({}, "nombre email role google img")
        .skip(desde)
        .limit(10),
        await Usuario.countDocuments()
    ])
    
    res.json({
        ok: true,
        usuarios,
        total        
    });
};

const crearUsuarios = async (req, res = response) => {
    try {
        const { email, password } = req.body;
        const existeUsuario = await Usuario.findOne({ email });
          if (existeUsuario) {
            return res
                .status(400)
                .json({ Ok: false, msg: "El correo ya está registrado!!" });
        }

        const usuario = new Usuario(req.body);

        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // guardar en la BD
        await usuario.save();

        // Generar Token
        const token = await generarJwt(usuario.id, usuario.nombre);

        res.json({ Ok: true, usuario, token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ Ok: false, msg: "Error al guardar un usuario...." });
    }
};

const actualizarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({ ok: false, msg: "No existe usuario" });
        }

        const { password, google, email, ...parametros } = req.body;

        if (usuarioDB.email !== email) {
            const existEmail = await Usuario.findOne({ email });
            if (existEmail) {
                return res
                    .status(400)
                    .json({ Ok: false, msg: "El ya existe un usuario con esye email!!" });
            }
        }
        parametros.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            uid,
            parametros,
            { new: true }
        );

        res.json({ Ok: true, usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ Ok: false, msg: "Error al actualiar usuario...." });
    }
};

const borrarUsuario = async (req, res = response) => {
    try {
        const uid = req.params.id;
        debugger;
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({ ok: false, msg: "No existe usuario" });
        }

        const usuarioActualizado = await Usuario.findByIdAndDelete(uid);
        res.json({ Ok: true });
    } catch (error) {
        console.log(error)
        res.status(500).json({ Ok: false, msg: "Error al eliminar usuario...." });
    }
};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
};
