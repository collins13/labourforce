const express = require("express");
const debug = require("debug");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.get("/", (req, res) => {
    res.render("register");
});
router.post("/", (req, res) => {
    User.find({ email: req.body.email }).then(user => {
        if (user.length >= 1) {
            return errors.push({ msg: "email already exists" });
        }
    });

    const user = new User({
        first: req.body.first,
        last: req.body.last,
        email: req.body.email,
        password: req.body.password
    });
    let errors = [];

    if (!user) {
        errors.push({ msg: "please fill a fields" });
    }
    if (user.password < 6) {
        errors.push({ msg: "password must be atleast 6 characters" });
    }
    if (errors.length > 0) {
        res.render("register", {
            errors,
            first,
            last,
            email,
            password
        });
    } else {
        res.send("registration success");
    }
    user
        .save()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(err => {
            debug(err);
        });
});

module.exports = router;