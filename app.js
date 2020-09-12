require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');

//import Routes
const authRoutes = require('./routes/auth');

// DB connectionString
const db = {
    uri:'mongodb://localhost:27017/login-system',
    options:{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }
};


//connect to DB
mongoose.connect(db.uri, db.options)
    .then(res=>{
        console.log('connected to DB')
    })
    .catch(err=>console.log(err));


//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Routes middlewares
app.use('/api/user',authRoutes);
 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} ...`);
});
