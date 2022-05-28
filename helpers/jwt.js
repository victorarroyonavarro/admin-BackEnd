const jwt = require('jsonwebtoken')

const generarJwt = (uid,nombre) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            nombre

        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '10h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puedo generar el JWT')
            }
            else{
                resolve(token);
            }
        })
    });

}

module.exports={
    generarJwt
}