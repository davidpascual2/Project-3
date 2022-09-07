const router = require('express').Router();
const {
    createUser,
    getSingleUser,
    // getUsers?,
    login
} = require('../../controllers/user-controller')

// add middleware if needed

// add authMiddleware if needed

module.exports = router;