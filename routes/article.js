const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')
const acc = require('../tools/acc');

// create article
router.post('/', articleController.createArticle)


// update article
router.put('/:id', articleController.updateArticle)


// delete article
router.delete('/:id', articleController.deleteArticle)


// get all articles
router.get('/all/:page/:count', articleController.getAllArticle)


// get all articles
router.get('/myArticles', articleController.getMyArticles)


// get single articles
router.get('/:id', articleController.getSingleArticle)


// admin delete article
router.delete('/admin/:id', acc.accessController, articleController.adminDeleteArticleController)





// router.get('/:parameter', function(req, res) {
//     if(req.params.parameter === "all") {
//         Article.find({})
//     } else if (req.params.parameter === "myArticles") {
//         Article.find({user: req.session.user._id})
//     } else {
//         Article.findById(req.params.id)
//     }
// })





module.exports = router;