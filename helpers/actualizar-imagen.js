const Usuario = require('../models/usuarios.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');
const fs = require('fs')

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = "";
    switch (tipo) {
        case 'medicos':

            const medico = await Hospital.findById(id);
            if (! medico) {
                return false;
            }
            this.pathViejo = `./uploads/medicos/${
                medico.img
            }`;
            borrarImagen(this.pathViejo);


            // guardar en la BD
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;

        case 'hospitales':
          
            const hospital = await Hospital.findById(id);
            if (! hospital) {
                return false;
            }
            this.pathViejo = `./uploads/hospitales/${
                hospital.img
            }`;
            borrarImagen(this.pathViejo);


            // guardar en la BD
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'usuarios':

            const usaurio = await Usuario.findById(id);
            if (! usaurio) {
                return false;
            }
            this.pathViejo = `./uploads/usuarios/${
                usaurio.img
            }`;
            borrarImagen(this.pathViejo);


            // guardar en la BD
            usaurio.img = nombreArchivo;
            await usaurio.save();
            return true;
            break;

    }

}

const borrarImagen =  (path) => {
  
    // borrar la imagen anterior
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

module.exports = {
    actualizarImagen
}
