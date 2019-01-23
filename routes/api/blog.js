const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer/MulterLocal');
const validateCreatePost = require('../../validation/create-blog');
const BlogArticle = require('../../models/BlogArticle');
const Jimp = require('jimp');
const path = require('path');

const loadArticleCount = 8;

const helpers = require('../../Helpers/helpers');




// @route GET api/blog
// @desc GET 8 BLOG ARTICLES
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
                .skip( (page - 1) * loadArticleCount )
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




// @route GET api/blog/:id
// @desc GET BLOG ARTICLE
// @access Private
router.get('/:id', (req, res, next) => {

    BlogArticle.findById(req.params.id)
        .then(article => {

            article.views_count = article.views_count + 1;
            article.save()
                .then(() => {
                    res.json(article); 
                })



        })
        .catch(err => res.status(404).json(err));
});


router.post('/create', upload.single('image_loader'), (req, res, next) => {

    // file
    if(!req.file) return res.status(404).json({ fileError: true });


    const { errors, isValid } = validateCreatePost(req.body);

    if(!isValid) {
        return res.status(404).json(errors);
    }

    const { title, short_description, full_description, source_link, tags} = req.body;


    // crop file
    const filePath = path.join(__dirname, '..', '..', 'files', 'blog', req.file.originalname);
    const filePathSmall = path.join(__dirname, '..', '..', 'files', 'blog', 'preview', req.file.originalname);

    Jimp.read( filePath, ( err, cropFile ) => {
        if (err) throw err;
        cropFile
            .resize(260, 180)
            .quality(60)
            .write(filePathSmall);
    }); 



    // reading_time
    const MiddleWord = 1000;
    const full_description__text = helpers.replaseHtmlFunc(req.body.full_description);

    const newBlogArticle = new BlogArticle({
        title,
        short_description,
        full_description,
        source_link,
        tags: tags.split(/[\s]+/).filter(t => t.length > 3 && t.includes('#')),
        full_page_image: `${req.file.destination}/${req.file.filename}`,
        preview_page_image: `${req.file.destination}/preview/${req.file.filename}`,
        reading_time: Math.ceil(full_description__text.length / MiddleWord)
    });

    newBlogArticle.save()
        .then(article => {
            res.json(article);
        })
        .catch(err => next(err));

});

module.exports = router;
