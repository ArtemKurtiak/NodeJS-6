const router = require('express').Router();

const {
    getAllUsers, getUserById, deleteUser, updateUser, createUser
} = require('../controllers/users.controller');
const {
    isFullDataInUserRequest,
    isUpdateUserDataSent, isUserIdFormatCorrect, checkUserAvailability, isUserNotExists, isUserExists
} = require('../middlewares/user.middleware');

router.get('/', getAllUsers);

router.post('/', isFullDataInUserRequest, checkUserAvailability('email'), isUserNotExists, createUser);

router.use('/:userId', isUserIdFormatCorrect);

router.patch('/:userId',
    isUpdateUserDataSent,
    checkUserAvailability('userId', 'params', '_id'),
    isUserExists,
    checkUserAvailability('email'),
    isUserNotExists,
    updateUser);

router.use('/:userId', checkUserAvailability('userId', 'params', '_id'), isUserExists);

router.get('/:userId', getUserById);

router.delete('/:userId', deleteUser);

module.exports = router;
