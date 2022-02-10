const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const generalTools = require('../tools/generalTools');
const fs = require('fs');
const path = require('path');

router.post('/uploadAvatar', (req, res) => {
    const upload = generalTools.upload.single('avatar');

    upload(req, res, function(err) {
        if (err) {
            console.log(err);
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


// router.put('/updateUser', (req, res) => {
//     User.findById(req.session.user._id, function(err, result) {

//         result.username = req.body.username;
//         result.password = req.body.newPass;




//         result.save()

//     })
// })


module.exports = router;