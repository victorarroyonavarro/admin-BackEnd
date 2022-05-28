const {response} = require("express");
const {v4: uuidv4} = require('uuid');
const espressPath = require('path');
const {actualizarImagen} = require('../helpers/actualizar-imagen');
const path = require('path')
const fs = require('fs')
const fileUploads = (req, res = response) => {
    try {

        const tipo = req.params.tipo;
        const id = req.params.id;

        // validar tipos
        const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
        if (! tiposValidos.includes(tipo)) {
            return res.status(400).json({Ok: false, msg: "No es un tipo válido...."});
        }


        // validar que exita un archivo
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({Ok: false, msg: "No hay ningun archivo...."});
        }

        // porcesar la imagen....
        const file = req.files.imagen;

        const nombreSplit = file.name.split('.'); // image.1.2.jpg
        const extensionArchivo = nombreSplit[nombreSplit.length - 1];

        // validar extension del archivo
        const extensionesValidas = [
            'png',
            'jpg',
            'jpeg',
            'gif',
            'jfif'
        ]
        if (! extensionesValidas.includes(extensionArchivo)) {
            return res.status(400).json({Ok: false, msg: "No es un archivo válido...."});
        }

        // Generar nombre archivo
        const nombreArchivo = `${
            uuidv4()
        }.${extensionArchivo}`;

        // path para guardar la imagen
        const path = `./uploads/${tipo}/${nombreArchivo}`;


        // Use the mv() method to place the file somewhere on your server
        file.mv(path, function (err) {
            if (err) {
                console.log(error)
                res.status(500).json({Ok: false, msg: "Error al mover la imagen...."});
            }


            const cargaImagen = actualizarImagen(tipo, id, nombreArchivo);

            if (! cargaImagen) {
                res.status(500).json({Ok: false, msg: "Error al subir la imagen...."});
            }

            // Actualizar BD


            res.json({Ok: true, msg: "Archivo subido correctamente", nombreArchivo});
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({Ok: false, msg: "Error al subir archivo...."});
    }
}


const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
   
}

module.exports = {
    fileUploads,
    retornaImagen
};
