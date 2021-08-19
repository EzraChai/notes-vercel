const { User } = require('../model')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/default.config')

/**
 * Login
 */
exports.login = async (req, res, next) => {
    try {
         let user = req.user.toJSON();
         console.log(user._id)
         delete user.password;

         const token = await jwt.sign({
            userId: user._id,
        },jwtSecret,{algorithm: 'HS512',expiresIn: '20d'});
        console.log(token);

        res.status(200).json({...user , token});
    } catch (error) {
        next(error);
    }
}


/**
 * Register
 */
 exports.register = async (req, res, next) => {
    try {
        console.log(req.body.user)
        let user = new User(req.body.user);
        await user.save();

        user = user.toJSON();
        delete user.password
        console.log(user);
        res.status(201).json({user});

    } catch (error) {
        next(error);
    }
}