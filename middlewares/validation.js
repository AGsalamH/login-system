const {body, validationResult} = require('express-validator');

const userValidationRules = ()=>{
    return [
        body('username').isString().isLength({min:2}).isAlphanumeric().notEmpty(),
        body('email').isEmail().notEmpty(),
        body('password').isLength({min:6}).notEmpty()
    ];
}


const loginValidationRules = ()=>{
    return [
        body('email').isEmail().notEmpty(),
        body('password').isLength({min:6}).notEmpty()
    ];
}


const validate = (req, res, next)=>{
    const errors = validationResult(req);

    // on case of no errors occured, continue with the next middleware
    if (errors.isEmpty()) {
        return next()
    }

    // catch Errors!
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
}


module.exports = {
    userValidationRules,
    validate,
    loginValidationRules,
}