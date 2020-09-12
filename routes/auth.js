const router = require('express').Router();
const authController = require('../controllers/authController');
const {validate, userValidationRules, loginValidationRules} = require('../middlewares/validation');
const verifyToken = require('../middlewares/verifyToken');

router.post(
    '/register',
    userValidationRules(), 
    validate,
    authController.register
);


router.post(
    '/login',
    loginValidationRules(), 
    validate, 
    authController.login
);


// Only for Testing the Authorization
router.get('/test',verifyToken, (req, res) => {
     res.json({msg: 'You are authorized :)'});
});


module.exports = router;