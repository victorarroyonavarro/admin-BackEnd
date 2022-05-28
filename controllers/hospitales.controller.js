const Hospital = require("../models/hospital.model");
const {response} = require("express");
const bcrypt = require("bcryptjs");
const {generarJwt} = require("../helpers/jwt");

const getHospitales = async (req, res = response) => {
    const hospitales = await Hospital.find().populate('usuario','nombre img')

    res.json({
        ok: true,
        Hospitales: [
            {
                ok: true,
                hospitales,
               
            },
        ],
    });
};

const crearHospital = async (req, res = response) => {

    try {
   
        const {nombre} = req.body;

        const existeHospital = await Hospital.findOne({nombre});

        if (existeHospital) {
            return res.status(400).json({Ok: false, msg: "Hospital ya está Ingresadoo!!"});
        }

        const uid = req.uid;

        const hospital = new Hospital({
            usuario: uid,
            ...req.body
        });

        const hospitalDB = await hospital.save();
        res.json({ok: true, hospital: hospitalDB});

    } catch (error) {
        console.log(error);
        res.status(500).json({Ok: false, msg: "Error al crear un hospital...."});
    }
};
const actualizarHospitales = (req, res = response) => {
    res.json({ok: true, msj: "actualizartHospitales"});
};

const borrarHospitales = (req, res = response) => {
    res.json({ok: true, msj: "corrarHospitales"});
};

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospitales,
    borrarHospitales
};
