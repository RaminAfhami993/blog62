const articleController = require('../controllers/articleController')
const Article = require('../models/article');


let getAllArticle = async function(req, res) {
    try {

        const articlesCount = await Article.countDocuments({});

        const articles = await Article.find({}, {__v: 0})
        .populate('user', 'avatar firstName lastName -_id')
        // .populate('user', {avatar: 1, firstName: 1, lastName: 1})
        .lean()
        .skip((req.params.page - 1) * req.params.count)
        .limit(req.params.count);


        res.json({articles, articlesCount})
    } catch (err) {
        res.status(400).send('wrong')
    }
}

let getMyArticles = function(req, res) {
    Article.find({user: req.session.user._id})
}

let getSingleArticle = function(req, res) {
    Article.findById(req.params.id)
}

let createArticle = async function(req, res) {

    try {
        let newArticle = await new Article({
            title: req.body.title,
            text: req.body.text,
            user: req.session.user._id
        }).save();


        newArticle = newArticle.toObject();

        let {__v, ...result} = newArticle

        res.json(result);
    } catch (err) {
        res.status(400).send('wrong')
    }

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