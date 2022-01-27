const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const User = require('../models/user'); 

router.use('/auth', authRouter);

router.post('/createAdmin', function(req, res) {
    User.findOne({role: 'admin'}, (err, existAdmin) => {
        if (err) {
            return res.status(500).send('Somthing went wrong!')
        };

        if (existAdmin) {
            return res.status(404).send('Not Found');
        };

        const ADMIN = new User({
            username: req.body.username,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            password: req.body.password,
            role: 'admin'
        });


        ADMIN.save((err, admin) => {
            if (err) {
                return res.status(500).send('Somthing went wrong!')
            };

            res.json(admin)
        })
    })
})

module.exports = router;