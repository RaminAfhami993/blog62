const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../models/user'); 
const generalTools = require('../tools/generalTools'); 


router.post('/uploadAvatar', (req, res) => {
    const upload = generalTools.upload.single('avatar');

    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.status(500).json({msg: "err"})
        }

        res.json({msg: "ok"})
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