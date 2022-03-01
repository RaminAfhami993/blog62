const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user'); 
const authTools = require('../tools/authTools'); 




router.get('/registerPage', authTools.sessionChecker, (req, res) => {
    res.render('register', {msg: null, num: 55})
});

router.get('/loginPage', authTools.sessionChecker, (req, res) => {
    res.render('login', {msg: null})
});

router.post('/register', async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('register', {msg: 'Not Acceptable'})
    };

    if (req.body.password.length > 50 || req.body.password.length < 8) {
        // return res.status(406).json({msg: 'Not Acceptable'});
        return res.render('register', {msg: 'Not Acceptable'});
    };

    try {
        let existUser = await User.findOne({username: req.body.username.trim()});
        if (existUser) {
            // return res.status(406).json({msg: "username already token"})
            return res.render('register', {msg: 'username already token'})
        };
    } catch (err) {
        return res.render('register', {msg: 'findOne err'})
    }

    const NEW_USER = new User({
        username: req.body.username,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        password: req.body.password
    });

    try {
        await NEW_USER.save();
        res.redirect('/api/auth/loginPage')
    } catch (err) {
        return res.render('register', {msg: 'Somthing went wrong'})
    }


    // User.findOne({username: req.body.username.trim()}, (err, existUser) => {
    //     if (err) {
    //         // return res.status(400).json({msg: "Somthing went wrong"})
    //         return res.render('register', {msg: 'Somthing went wrong'})
    //     };

    //     if (existUser) {
    //         // return res.status(406).json({msg: "username already token"})
    //         return res.render('register', {msg: 'username already token'})
    //     };

    //     const NEW_USER = new User({
    //         username: req.body.username,
    //         lastName: req.body.lastName,
    //         firstName: req.body.firstName,
    //         password: req.body.password
    //     });

    //     NEW_USER.save((err, user) => {
    //         if (err) {
    //             // return res.status(400).json({msg: "Somthing went wrong"})
    //             return res.render('register', {msg: 'Somthing went wrong'})

    //         };
    
    //         res.redirect('/api/auth/loginPage')
    //     });  
    // });
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
    res.render('dashboard', {avatar: req.session.user.avatar, _id: req.session.user._id, username: req.session.user.username})
});

router.get('/logout', (req, res) => {
    res.clearCookie('user_sid');
    res.redirect('/api/auth/loginPage')
})







module.exports = router;







// not important
// const fs = require('fs');


// fs.readFile('path1', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     fs.writeFile('path2', data, (err) => {
//         if (err) console.log(err);
//         fs.appendFile("path2", 'sample text', (err) => {
//             if (err) console.log(err);
            
//         })
//     })
// })

// let data;
// try {
//     data = fs.readFileSync('path1', 'utf-8');
// } catch (err) {
//     console.log(err);
// }

// try {
//     fs.writeFileSync('path2', data);
// } catch (err) {
//     console.log(err);
// }

// try {
//     fs.appendFileSync('path2', 'sample text')
// } catch (err) {
//     console.log(err);
// }






const fs = require('fs');




(async function() {
    // fs.readFile(`${__dirname}/sample.txt`, 'utf8', function(err, data) {
    //     if (err) {
    //         return console.log(err);
    //     };
    
    //     console.log(data);
    // });

    let data;
    try {
        data = await new Promise((resolve, reject) => {
            fs.readFile(`${__dirname}/samle.txt`, 'utf8', function(err, data) {
                if (err) {
                    reject(err)
                }
    
                resolve(data)
            });
        })
    } catch (err) {
        console.log("err ---> ", err);
    }
    console.log(data);
})();















