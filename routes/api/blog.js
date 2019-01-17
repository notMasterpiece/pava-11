const express = require('express');
const router = express.Router();
const upload = require('../../middleware/multer/MulterLocal');
const validateCreatePost = require('../../validation/create-blog');
const BlogArticle = require('../../models/BlogArticle');


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
