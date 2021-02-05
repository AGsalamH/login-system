require('dotenv').config();

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan'); 

//import Routes
const authRoutes = require('./routes/auth');

// Import middleware
const {urlNotFound, globalErrorHandling} = require('./middlewares/errorHandling');

// Instantiate Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger('dev'));

// Routes 
app.use('/',authRoutes);

// 404
// Must be beneath all routes.
app.use(urlNotFound);

// All errors are passed to this.
app.use(globalErrorHandling);


const PORT = process.env.PORT || 3000;
// DB connectionString
const db = {
    uri:'mongodb://localhost:27017/login-system',
    options:{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }
};

// Connect to DB
// Start Server
mongoose.connect(db.uri, db.options)
.then(result=>{
    console.log('mongoDB Connected ...');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} ...`);
    });
});