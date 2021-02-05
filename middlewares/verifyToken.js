const jwt = require('jsonwebtoken');
const {isMongooseError, jwtError, _throw} = require('../utils/errorHandling');

const User = require('../models/User');

module.exports = async (req, res, next)=>{
    const token = req.get('Authorization');
    try {
        if(!token){
            const error = new jwt.JsonWebTokenError('Access-denied');
            error.statusCode = 401;
            throw error;
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified._id);
        if(!user){
            const error = new jwt.JsonWebTokenError('User not found!');
            error.statusCode = 404;
            throw error;
        }
        req.user = verified;
        next();        
    } catch (err) {
        isMongooseError(err) || jwtError(err) ? next(err) : _throw(err);
    }
}
