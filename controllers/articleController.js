const articleController = require('../controllers/articleController')
const Article = require('../models/article');


let getAllArticle = function(req, res) {
    Article.find({})
}

let getMyArticles = function(req, res) {
    Article.find({user: req.session.user._id})
}

let getSingleArticle = function(req, res) {
    Article.findById(req.params.id)
}

let createArticle = function(req, res) {

}

let updateArticle = function(req, res) {
    
}

let deleteArticle = function(req, res) {
    
}


module.exports = {
    getAllArticle,
    getMyArticles,
    getSingleArticle,
    createArticle,
    updateArticle,
    deleteArticle
}