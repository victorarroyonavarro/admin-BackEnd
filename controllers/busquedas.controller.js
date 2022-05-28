const {response} = require("express");
const bcrypt = require("bcryptjs");
const {generarJwt} = require("../helpers/jwt");
const Usuarios = require("../models/usuarios.model");
const Hospitales = require("../models/hospital.model");
const Medicos = require("../models/medico.model");




const getTodos = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regexUsuario = new RegExp(busqueda, 'i');
    const regexHospitales = new RegExp(busqueda, 'i');
    const regexMedicos = new RegExp(busqueda, 'i');

    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuarios.find(
            {nombre: regexUsuario}
        ),
        Hospitales.find(
            {nombre: regexHospitales}
        ),
        Medicos.find(
            {nombre: regexMedicos}
        )
    ])


    res.json({ok: true, usuarios, hospitales, medicos});
};


const getDocumentoColeccion = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla
    const regex = new RegExp(busqueda, 'i');
    let data = [];
    switch (tabla) {
        case 'medicos': data = await Medicos.find({nombre: regex}).populate('usuario', 'nombre img').populate('hospital', 'nombre img')
            break;

        case 'hospitales': data = await Hospitales.find({nombre: regex}).populate('usuario', 'nombre img');
            break;

        case 'usuarios': data = await Usuarios.find({nombre: regex});
            break;

        default:
            return res.status(400).json({ok: false, msg: "La tabla no existe..."})
    }

    res.json({ok: true, resultados: data});


};


module.exports = {
    getTodos,
    getDocumentoColeccion
};
