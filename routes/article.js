const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController')


// create article
router.post('/', articleController.createArticle)


// update article
router.put('/', articleController.updateArticle)


// delete article
router.delete('/', articleController.deleteArticle)


// get all articles
router.get('/all', articleController.getAllArticle)


// get all articles
router.get('/myArticles', articleController.getMyArticles)


// get single articles
router.get('/:id', articleController.getSingleArticle)





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