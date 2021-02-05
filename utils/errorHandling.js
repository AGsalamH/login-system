const mongooseError = require('mongoose').Error;

// Check if it's a mongoose related Error.
// To catch only mongoose Errors 
const isMongooseError = err => err instanceof mongooseError;

// Check if it's a Jsonwebtoken error
const jwtError = err => {
    const condition = (
        err.name === 'JsonWebTokenError' ||
        err.name === 'NotBeforeError'    ||
        err.name === 'TokenExpiredError'
    );
    return condition;
}

// To obe  able to throw errors in a ternary operator AKA Ta7neka :D
const _throw = err =>{
    throw err;
}

module.exports = {
    isMongooseError,
    jwtError,
    _throw,
    mongooseError
}
