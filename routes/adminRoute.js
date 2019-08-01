const express = require('express');
const debug = require('debug');
const router = express.Router()



router.get('/', function(req, res) {
    res.render('admin/index');
});


module.exports = router;