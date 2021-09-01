const router = require('express').Router();

const { login, register } = require('../controllers/auth.controller');
const {
    isFullDataInUserRequest, isLoginBodyCorrect, checkUserAvailability, isUserNotExists, isUserExists
} = require('../middlewares/user.middleware');

router.post('/register', isFullDataInUserRequest, checkUserAvailability('email'), isUserNotExists, register);

router.post('/login', isLoginBodyCorrect, checkUserAvailability('email'), isUserExists, login);

module.exports = router;
