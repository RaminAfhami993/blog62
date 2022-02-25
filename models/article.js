const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const ArticleShema = new Schema({ 
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    image: {
        type: String
    }
});


module.exports = mongoose.model("Article", ArticleShema);