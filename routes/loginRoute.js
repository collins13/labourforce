const express = require('express');
const debug = require('debug');
const router = express.Router()
router.get('/', (req, res) => {
    res.render('login');
});


module.exports = router;