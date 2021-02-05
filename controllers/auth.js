const express = require('express');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../models/User');

const {isMongooseError, jwtError, _throw} = require('../utils/errorHandling');


// POST /signup
const signup = async (req, res, next)=>{
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const savedUser = await user.save();
        res.status(201).json({
            ok: 1,
            user: savedUser
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


// POST /login
const login = async (req, res, next)=>{
    try {
        const user = await User.emailExists(req.body.email);
        await user.comparePassword(req.body.password);

        // Here Everythin is fine...
        // Let's sign a token
        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET);

        // Send token to client in response header
        res.setHeader('Authorization', token);
        res.json({
            ok: 1,
            msg: 'Logged in :)'
        });
    } catch (err) {
        isMongooseError(err) || jwtError(err) ? next(err) : _throw(err);
    }
}


module.exports = {
    signup,
    login
}