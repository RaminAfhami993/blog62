const User = require('../models/user'); 

function init() {
    User.findOne({role: 'admin'}, (err, existAdmin) => {
        if (err) {
            return console.log('Somthing went wrong in find exist admin!')
        };

        if (existAdmin) {
            return console.log('Admin already created');
        };

        const ADMIN = new User({
            username: "admin",
            lastName: 'admin',
            firstName: "admin",
            password: "12345678",
            role: 'admin'
        });


        ADMIN.save((err, admin) => {
            if (err) {
                return console.log('Somthing went wrong in save admin!')
            };

            console.log("Admin created!");
        })
    })
}


module.exports = init;