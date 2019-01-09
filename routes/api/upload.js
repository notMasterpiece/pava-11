const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../start-up/multer');
const cloudinary = require('cloudinary');
require('../../start-up/cloudinary');
const Profile = require('../../models/Profile');



// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', upload.single('image'), passport.authenticate('jwt', { session: false }), async (req, res) => {

    // if (!res.file) return;
    // console.log('req user', req.user);
    const result = await cloudinary.v2.uploader.upload(req.file.path);

    Profile.findOneAndUpdate({user: req.user.id}, {$set: {image: result.secure_url}}, {new: true})
        .then(profile => {
            res.json(profile)
        })
        .catch(err => console.log(err));

});


// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/gallery', upload.array('gallery'), passport.authenticate('jwt', { session: false }), async (req, res) => {

    // res_promises will be an array of promises
    let res_promises = req.files.map(file => new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false }, function (error, result) {

                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            })
        })
    );

    // Promise.all will fire when all promises are resolved
    Promise.all(res_promises)
        .then(result => {

            Profile.findOne({user: req.user.id})
                .then(profile => {

                    const newGalleryItem = {};
                    newGalleryItem.images = result;

                    // Add to gallery array
                    profile.gallery.unshift(newGalleryItem);

                    profile
                        .save()
                        .then(profile => res.json(profile.gallery))
                        .catch(err => {console.log(err)})
                })

        })
        .catch(err => {
            console.log(err);
        });

});

module.exports = router;
