const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    saveProperty,
    deleteProperty,
    // getUsers?,
    login
} = require('../../controllers/user-controller')

// add middleware if needed
const { authMiddleware } = require('../../utils/auth');

// add authMiddleware if needed
router.route('/').post(createUser).put(authMiddleware, saveProperty);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/properties/propertyId').delete(authMiddleware, deleteProperty);

module.exports = router;