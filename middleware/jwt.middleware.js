const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/jwt");
module.exports = function (req,res,next){
    const header = req.headers['authorization'];
    if (header){
        const parts = header.split(' ');
        if (parts[0] === 'Bearer') {
            jwt.verify(parts[1], jwtSecret.secret, function (err, decoded) {
                if (err) {
                    res.status(403).send()
                } else {
                    // add user id to request
                    req.userId = decoded.id;
                    next();
                }
            });
        }else{
            res.status(403).send()
        }
    }
    else{
        res.status(403).send()
    }
}