const generalTools = {};
const multer = require('multer');
const path = require('path')




const avatarStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '../public/images/avatars'));
    },
    filename: function(req, file, cb) {
        
        cb(null, Date.now() + "_" + file.originalname);
    }
});



generalTools.upload = multer({
    storage: avatarStorage,
    fileFilter: function(req, file, cb) {

        console.log(file);
        if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
            return cb('invalid type!', false)
        }
        cb (null, true)
    }
});






module.exports = generalTools;