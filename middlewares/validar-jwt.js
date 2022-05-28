const jwt = require('jsonwebtoken');

const validarJwt = (req, res, next) => { // Leer el token

    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        console.log(req.token);

        try {

            const {uid} = jwt.verify(req.token, process.env.JWT_SECRET);
            console.log(uid)
            req.uid = uid;
            next();
        } catch (error) {
            return res.status(400).json({ok: false, msg: "Token no válido"})
        }


    } else {
        return res.status(400).json({ok: false, msg: "No hay Token en la Petición"})
    }
}

module.exports = {
    validarJwt
}
