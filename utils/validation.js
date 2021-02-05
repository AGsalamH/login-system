const {body} = require('express-validator');

const userValidationRules = ()=>{
    return [
        body('name', 'Must be at least 2 characters').trim().isString().isLength({min:2}),
        body('email', 'Invalid email format').trim().isEmail().notEmpty(),
        body('password', 'Must be at least 6 characters').trim().isLength({min:6})
    ];
}

const loginValidationRules = ()=>{
    return [
        body('email', 'Invalid email format').isEmail().notEmpty(),
        body('password', 'Must be at least 6 characters').isLength({min:6}).notEmpty()
    ];
}


module.exports = {
    userValidationRules,
    loginValidationRules
}