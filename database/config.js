const mongoose = require('mongoose');
require('dotenv').config();
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.db_cnn);
        console.log('BD Activada')
    } catch (error) {
        console.log(error);
        throw new Error('Error la BD no porde iniciar');
    }


}

module.exports={
    dbConnection
}
