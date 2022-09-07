const router = require('express').Router();
const userRoutes = require('./');

router.use('/users', userRoutes);

module.exports = router

//?????