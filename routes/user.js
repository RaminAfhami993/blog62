const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const generalTools = require('../tools/generalTools');
const fs = require('fs');
const path = require('path');

router.post('/uploadAvatar', (req, res) => {
    
    if (!req.session.user) {
        return res.status(403).send("access denied")
    }
    
    const upload = generalTools.upload.array('avatar');
    body = req.body;
    upload(req, res, function(err) {
        body = req.body;
        if (!req.file) {
                return res.status(400).json({msg: "Bad request"})
        };

        if (err) {
            return res.redirect('/api/auth/dashboard')
        };

        User.findByIdAndUpdate(req.session.user._id, {avatar: req.file.filename}, function(err, user) {
            if (err) {
                return res.status(400).json({msg: "err"})
            };

            try {
                if (req.session.user.avatar) {
                    fs.unlinkSync(path.join(__dirname, "../public/images/avatars", req.session.user.avatar))
                };
            } catch(err) {
                return res.status(400).json({msg: "err"})
            };

            req.session.user.avatar = req.file.filename;

            res.redirect('/api/auth/dashboard')
        })
    })
})


router.put('/updateUser', (req, res) => {

    User.findById(req.session.user._id, function(err, result) {

        result.username = req.body.username;
        result.password = req.body.newPass;




        result.save()

    })
})


// router.get('/article', myfunc, handler, addressController);
// router.put('/article', myfunc, handler, addressController)
// router.post('/article', myfunc, handler, addressController)
// router.delete('/article', myfunc, handler, addressController)



// let myfunc = function(req, res, next) {}
// let handler = function(req, res, next) {}

// let addressController = function(req, res) {}

module.exports = router;