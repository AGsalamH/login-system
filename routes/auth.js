const router = require('express').Router();
const {login, signup} = require('../controllers/auth');
const validate = require('../middlewares/validation');
const {userValidationRules, loginValidationRules} = require('../utils/validation');

/*
    - POST /login    
    - POST /signup    
*/

router.post('/signup', userValidationRules(), validate, signup);
router.post('/login', loginValidationRules(), validate, login);


module.exports = router;