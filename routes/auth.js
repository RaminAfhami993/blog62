const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user'); 



router.get('/registerPage', sessionChecker, (req, res) => {
    res.render('register', {msg: null})
});

router.get('/loginPage', sessionChecker, (req, res) => {
    res.render('login', {msg: null})
});

router.post('/register', (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('register', {msg: 'Not Acceptable'})
    };

    if (req.body.password.length > 50 || req.body.password.length < 8) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('register', {msg: 'Not Acceptable'});
    };


    User.findOne({username: req.body.username.trim()}, (err, existUser) => {
        if (err) {
            // return res.status(500).json({msg: "Somthing went wrong"})
            return res.render('register', {msg: 'Somthing went wrong'})

        };

        if (existUser) {
            // return res.status(406).json({msg: "username already token"})
            return res.render('register', {msg: 'username already token'})

        };

        const NEW_USER = new User({
            username: req.body.username,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            password: req.body.password
        });

        NEW_USER.save((err, user) => {
            if (err) {
                // return res.status(500).json({msg: "Somthing went wrong"})
                return res.render('register', {msg: 'Somthing went wrong'})

            };
    
            res.redirect('/api/auth/loginPage')
        });  
    });
});


router.post('/login', (req, res) => {
    if (!req.body.username || !req.body.password) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('login', {msg: 'Not Acceptable'})
    };


    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            return res.render('login', {msg: 'Somthing went wrong'})
        } 
        if (!user) {
            return res.render('login', {msg: 'Wrong username or password'})
        }

        bcrypt.compare(req.body.password, user.password, function(err, result) {
            if (err) {
                return res.render('login', {msg: 'Somthing went wrong'})
            } 

            if (!result) {
                return res.render('login', {msg: 'Wrong username or password'})
            };

            req.session.user = user;

            res.redirect('/api/auth/dashboard')
        });
    })
});



router.get('/dashboard', (req, res) => {
    if (!req.session.user || !req.cookies.user_sid) {
        return res.redirect('/api/auth/loginPage')
    };
    res.render('dashboard', {_id: req.session.user._id, username: req.session.user.username})
});

router.get('/logout', (req, res) => {
    res.clearCookie('user_sid');
    res.redirect('/api/auth/loginPage')
})


// router.put('/updateUser', (req, res) => {
//     User.findById(req.session.user._id, function(err, result) {

//         result.username = req.body.username;
//         result.password = req.body.newPass;



//         result.save()

//     })
// })




function sessionChecker(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect('/api/auth/dashboard')
    } 
    next()
}

module.exports = router;