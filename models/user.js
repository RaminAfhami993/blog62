const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const Schema = mongoose.Schema;

const UserShema = new Schema({ 
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 30,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    sex: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: 'male'
    }
});



UserShema.pre('save', function(next) {
    // console.log('pre save');

    let user = this._doc;
    if (this.isNew || this.isModified('password')) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
    
                user.password = hash;
    
                next();
            });
        });
    } else {
        next()
    }
   
});

UserShema.post('save', function(doc, next) {
    // console.log('post save');

    next()
});






module.exports = mongoose.model("User", UserShema);