const router = require('express').Router();
const userRoutes = require('./user-routes');
//add additional routes here
router.use('/users', userRoutes);

module.exports = router

//?????