const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const User = require('../models/user'); 
const authTools = require('../tools/authTools')


router.use('/auth', authRouter);
router.use('/user', authTools.loginChecker, userRouter);
// router.use('/article', authTools.loginChecker, articleRouter);






router.get('/deleteUser', accessController(['admin']), function(req, res) {

    res.json('user removed')
})


router.get('/createArticle', accessController(['admin', 'blogger']), function(req, res) {

    res.json('article created')
})


// function accessController(req, res, next) {
//     if (req.session.user.role !== "admin") {
//         return res.status(403).send('Access denied!')
//     };

//     next();
// }

function accessController(roles) {
    return function(req, res, next) {
        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send('Access denied!')
        };

        next()
    }
}








router.post('/createAdmin', function(req, res) {
    User.findOne({role: 'admin'}, (err, existAdmin) => {
        if (err) {
            return res.status(400).send('Somthing went wrong!')
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
                return res.status(400).send('Somthing went wrong!')
            };

            res.json(admin)
        })
    })
})

module.exports = router;