const express = require('express');
const debug = require('debug');
const router = express.Router()


router.get('/', (req, res) => {
    res.render('profile');
});


module.exports = router;