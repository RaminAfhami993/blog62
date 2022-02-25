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
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            return res.status(400).send('wrong')
        }
        if (article.user.toString() !== req.session.user._id.toString()) {
            return res.status(403).send("access denied!")
        }

        article.delete((err) => {
            if (err) {
                return res.status(400).send('wrong')
            }

            Comment.deleteMany({article: article._id}, (err) => {

            })
        })
    })
}


let adminDeleteArticleController = function(req, res) {
    Article.findByIdAndRemove(req.params.id, (err, article) => {
        if (err) {
            return res.status(400).send('wrong')
        }

        Comment.deleteMany({article: article._id}, (err) => {
            if (err) {
                return res.status(400).send('wrong')
            }

            res.json(article)
        })
    })
}

module.exports = {
    getAllArticle,
    getMyArticles,
    getSingleArticle,
    createArticle,
    updateArticle,
    deleteArticle,
    adminDeleteArticleController
}