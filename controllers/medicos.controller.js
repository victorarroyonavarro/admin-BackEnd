const Medicos = require("../models/medico.model");
const {response} = require("express");
const bcrypt = require("bcryptjs");
const {generarJwt} = require("../helpers/jwt");

const getMedicos =async (req, res = response) => {
    const medicos = await Medicos.find()
                                     .populate('usuario','nombre img')
                                     .populate('hospital','nombre img')

    res.json({
        ok: true,
        Medicos: [
            {
                ok: true,
                medicos,
               
            },
        ],
    });
};

const crearMedico = async (req, res = response) => {
    try {
        const {nombre} = req.body;

        const existeMedico = await Medicos.findOne({nombre});

        if (existeMedico) {
            return res.status(400).json({Ok: false, msg: "Médico ya está Ingresadoo!!"});
        }

        const uid = req.uid;

        const medico = new Medicos({
            usuario: uid,
            ...req.body
        });

        const medicoDB = await medico.save();

        res.json({ok: true, Medico: medicoDB});
    } catch (error) {
        console.log(error);
        res.status(500).json({Ok: false, msg: "Error al crear un médico...."});
    }
};
const actualizarMedico = (req, res = response) => {
    res.json({ok: true, msj: "actualizartHospitales"});
};

const borrarMedico = (req, res = response) => {
    res.json({ok: true, msj: "corrarHospitales"});
};

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
};
