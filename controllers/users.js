const userModel=require('../models/users')
const bcrypt=require('bcrypt')
const jwtSecret = require('../config/jwt')
const jwt=require('jsonwebtoken')
module.exports = {
    create:async function (req, res, next) {

        const user=await userModel.create({ username: req.body.username, email: req.body.email, password: req.body.password });
        if(user)
            res.json({status:"success", message: "user registered!!!", data:{user: user}});
        else
            res.status(404).send();
    },
    authenticate:async function(req, res, next) {
        const user=await  userModel.findOne({email:req.body.email});
        //     if (err) {
        //         next(err);
        //     } else {
        //         if(bcrypt.compareSync(req.body.password, userInfo.password)) {
        //             const token = jwt.sign({id: userInfo._id}, jwtSecret.secret, { expiresIn: '1h' });
        //             res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:token}});
        //         }else{
        //             res.json({status:"error", message: "Invalid email/password!!!", data:null});
        //         }
        //     }
        // });
        if(!user)
            res.status(401).json({status:"error"})
        else {
                    if(bcrypt.compareSync(req.body.password, user.password)) {
                        const token = jwt.sign({id: user._id}, jwtSecret.secret, { expiresIn: '1h' });
                        res.json({status:"success", message: "user login successfully!!", data:{user: user, token:token}});
                    }else{
                        res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }
                }
    },
}