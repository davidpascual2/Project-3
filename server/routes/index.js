const router = require('express').Router()
const path = require('path');  // is this needed?
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

//serve up react front-end in production
router.use((req, res) => { // is this needed?
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});


module.exports = router;