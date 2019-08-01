const express = require("express");
const debug = require("debug");
const router = express.Router();
const Register = require("../models/register");

router.get("/", (req, res) => {
    res.render("register");
});
router.post("/", (req, res) => {
    const register = new register({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.password
    });
    req
        .save()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(err => {
            debug(err);
        });
});

module.exports = router;