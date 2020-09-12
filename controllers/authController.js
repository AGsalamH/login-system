const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res)=>{
    // Extracting the Data from request Body
    let username = req.body.username;
    let email= req.body.email;
    let password = req.body.password;

    User.findOne({email:email})
    .then(userDoc=>{
        //Checking if the Email already Exists
        if (userDoc) {
            return  res.status(400).json({error:'Email already Exists'});
        }


        // Hash the password
        bcrypt.hash(password, 10)
        .then(hashedPassword=>{
            const newUser = new User({
                name:username,
                email:email,
                password:hashedPassword
            });
            //Finally, Saving the user in the DB
            newUser.save(()=>{
                 res.status(201).json({msg: 'User Created!'});
            });
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}


const login = (req, res)=>{
   const {email, password} = req.body;

   //Checking if email exists
   User.findOne({email:email})
   .then(userDoc=>{
        // if Email Does'nt Exist
        if(!userDoc){
           return res.status(404).json({error: 'Email Does\'nt Exist'});
        }

        // Email Exists...
        // Checking if the password matches
        bcrypt.compare(password, userDoc.password)
        .then(isCorrect=>{
            if(!isCorrect){
                return res.status(400).json({error:'password isn\'t correct'});
            }

            //Here password matches...
            //Let's Generate Token
            const token = jwt.sign({_id:userDoc._id}, process.env.TOKEN_SECRET);
            
            //Send token to the Client in the response header
            res.header('auth-token', token);
            res.status(200).json({msg: 'Logged in'});

        })
        .catch(err=>console.log(err));
      
    })
    .catch(err=>console.log(err));
       
}


module.exports = {
    register,
    login
}