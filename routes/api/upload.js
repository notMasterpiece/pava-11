const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('../../start-up/multer');
const cloudinary = require('cloudinary');
require('../../start-up/cloudinary');
const Profile = require('../../models/Profile');
const Image = require('../../models/Images');



// @route   GET api/upload
// @desc    Get all image by current user
// @access  Private
router.get('/', passport.authenticate(['jwt', 'facebook'], { session: false }), (req, res) => {

    Image
        .find({user: req.user.id})
        .populate('user')
        .then( images => {
            res.json(images)
        })
        .catch(err => {
            console.log(err);
        })

});


// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', upload.single('image'), passport.authenticate('jwt', { session: false }), async (req, res) => {

    const result = await cloudinary.v2.uploader.upload(req.file.path);

    Profile.findOneAndUpdate({user: req.user.id}, {$set: {image: result.secure_url}}, {new: true})
        .then(profile => {
            res.json(profile)
        })
        .catch(err => console.log(err));

});


// @route   POST api/gallery
// @desc    Add images to gallery
// @access  Private
router.post('/gallery', upload.array('gallery'), passport.authenticate('jwt', { session: false }), (req, res) => {

    let res_promises = req.files.map(file => {
        return new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload(file.path, { use_filename: true, unique_filename: false },  (error, result) => {

                if (error) {
                    reject(error);
                } else {
                    resolve(uploadFiles = {result, file});
                }
            })
        })}
    );


    Promise.all(res_promises)
        .then(result => {

            const imgPromises = result.map( img => {
                return new Promise((resolve, reject) => {

                    const image = new Image({
                        user: req.user.id,
                        image: img.result.secure_url,
                        name: img.file.originalname,
                        format: img.result.format,
                        size: img.result.bytes,
                        width: img.result.width,
                        height: img.result.height
                    });


                    image.save((error, result) => {
                        if (error) {
                            reject(error)
                        }
                        resolve(result);
                    })
                })
            });
            Promise.all(imgPromises)
                .then(resultsImg => {
                    res.json(resultsImg);
                })
                .catch(err => {
                    console.log(err);
                })


        })
        .catch(err => {
            console.log(err);
        });

});


// @route   GET api/upload
// @desc    Delete image by image ID
// @access  Private
router.post('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {

    Image.findByIdAndRemove(req.params.id)
        .then(() => {
            res.json({
                status: 'ok',
                payload: req.params.id
            })
        })
        .catch(err => {
            console.log(err);
        })

});

module.exports = router;
