const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    }

}, {timestamps: true});


// Pre Hook that Checks if this email exists or not before saving it .
userSchema.pre('save', async function (next) {
    if(! this.isModified('email')){
        return next();
    }
    const email = await this.collection.findOne({email: this.email});
    if(email){
        const error = new mongoose.Error('Email already exists!');
        error.statusCode = 400;
        return next(error);
    }
    next();
});

// Hash password before saving it.
userSchema.pre('save', async function (next) {
    if(! this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Document Method
userSchema.methods.comparePassword = async function(password) {
    const isCorrect = await bcrypt.compare(password, this.password);
    if(!isCorrect){
        const error = new mongoose.Error('Password is\'nt correct!');
        error.statusCode = 400;
        throw error;
    }
    return isCorrect;
}

// Model Method
userSchema.statics.emailExists = async function (email) {
    const user = await this.findOne({email});
    if(!user){
        const error = new mongoose.Error('User not found!');
        error.statusCode = 404;
        throw error;
    }
    return user;
}


module.exports = mongoose.model('User', userSchema);