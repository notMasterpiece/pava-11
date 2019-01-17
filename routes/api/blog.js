const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer/MulterLocal');
const validateCreatePost = require('../../validation/create-blog');
const BlogArticle = require('../../models/BlogArticle');

const loadArticleCount = 8;




// @route GET api/blog
// @desc GET BLOG ARTICLE
// @access Private
router.get('/', (req, res, next) => {

    const page = +req.query.page || 1;
    let totalArticle;

    BlogArticle
        .find()
        .countDocuments()
        .then( count => {

            totalArticle = count;

            return BlogArticle
                .find()
                .skip( (page - 1) * loadArticleCount)
                .limit( loadArticleCount )
                .then(article => {
                    res.json({
                        totalArticle,
                        currentPage: page,
                        hasNextPage: loadArticleCount * page < totalArticle,
                        hasPreviosPage: page > 1,
                        nextPage: page + 1,
                        previosPage: page - 1,
                        lastPage: Math.ceil(totalArticle / loadArticleCount),
                        article: article.sort( (a, b) => new Date(b.created_at) - new Date(a.created_at))
                    })
                })
                .catch( err => {
                    next(err)
                });

        })
        .catch(err => {
            next(err)
        })
});


router.post('/create', upload.single('image_loader'), (req, res, next) => {


    // file
    if(!req.file) return res.status(404).json({ fileError: true });

    const { errors, isValid } = validateCreatePost(req.body);

    if(!isValid) {
        return res.status(404).json(errors);
    }

    const { title, short_description, full_description, source_link, tags} = req.body;


    const newBlogArticle = new BlogArticle({
        title,
        short_description,
        full_description,
        source_link,
        tags: tags.split(/[\s]+/).filter(t => t.length > 3 && t.includes('#')),
        full_page_image: `${req.file.destination}/${req.file.filename}`
    });

    newBlogArticle.save()
        .then(article => {
            res.json(article);
        })
        .catch(err => next(err));

});

module.exports = router;
