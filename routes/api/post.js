const express = require('express');
const router = express.Router();
const passport = require('passport');




const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');



// @route GET api/posts
// @desc GET post
// @access Public
router.get('/', (req, res, next) => {

    const {page} = req.query;

    const options = {
        page,
        limit: 6,
        sort: {'date': -1}
    };

    Post
        .paginate({}, options)
        .then(posts => {
            res.json({posts})
        })
        .catch(err => next(err));
});



// @route GET api/posts/:id
// @desc GET post
// @access Public
router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.status(404).json(err));
});




// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(404).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
    });

    newPost.save()
        .then(post => {
            res.json(post);
        });


});




// @route DELETE api/posts/:id
// @desc DELETE post
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({user: req.user.id})
        .then( () => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.user.toString() !== req.user.id) {
                        return res.status(401).json({not_autorized: 'User not autorized'})
                    }
                    // Delete
                    post.remove().then( () => res.json({success: true}) );
                })
                .catch(err => {
                    res.status(404).json({post_not_found: 'No post found'})
                })
        })
});



// @route POST api/posts/like/:id
// @desc POST like
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req,res) => {
    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if ( post.likes.filter(like => like.user.toString() === req.user.id).length > 0 ) {
                        return res.status(400).json({already_liked: 'You liked it'})
                    }
                    post.likes.push({user: req.user.id});
                    post.save()
                        .then(post => res.json(post))
                        .catch(err => res.json(err));
                })
                .catch(err => {
                    res.status(404).json({post_not_found: 'No post found'})
                })
        })
});


// @route POST api/posts/unlike/:id
// @desc POST unlike
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

    Profile.findOne({user: req.user.id})
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if ( post.likes.filter(like => like.user.toString() === req.user.id).length === 0 ) {
                        return res.status(400).json({not_liked: 'You haven‘t like it'})
                    }
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);

                    post.likes.splice(removeIndex, 1);

                    post.save()
                        .then(post => res.json(post))
                        .catch(err => res.json(err));

                })
                .catch(err => {
                    res.status(404).json({post_not_found: 'No post found'})
                })
        })
});




// @route POST api/posts/comments/:id
// @desc POST comments
// @access Private
router.post('/comments/:id', passport.authenticate('jwt', { session: false }), (req,res) => {

    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(404).json(errors);
    }

    Post.findById(req.params.id)
        .then(post => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            };

            post.comments.push(newComment);
            post.save()
                .then(post => res.json(post))
                .catch(err => res.json(err));
        })
        .catch(err => res.status(404).json(err));
});



// @route DELETE api/posts/comments/:id/:comments_id
// @desc DELETE comments
// @access Private
router.delete('/uncomments/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req,res) => {

    Post.findById(req.params.id)
        .then(post => {
            // Check if comment exist
            if( post.comments.filter(comment => comment._id.toString() === req.params.comment_id ).length === 0) {
                return res.status(404).json({comment_not_exict: 'No comments'})
            }

            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            post.comments.splice(removeIndex, 1);

            post.save()
                .then( post => res.json(post) )
                .catch( err => res.json(err) );
        })
        .catch(err => res.status(404).json(err));
});


module.exports = router;
