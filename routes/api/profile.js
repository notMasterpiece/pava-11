const express = require('express');
const router = express.Router();
const passport = require('passport');
const auth = require('../../middleware/auth/auth');


const Profile = require('../../models/Profile');
const User = require('../../models/Users');


const upload = require('../../middleware/multer/MulterLocal');
const cloudinary = require('cloudinary');
require('../../start-up/cloudinary');


// load input validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res, next) => {
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate(
            'user',
            ['name', 'avatar']
        );

        if (!profile) {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        next(err);
    }
});


// @route   GET api/profile
// @desc    Current prifile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile';
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            res.status(404).json(err);
        });

});


// @route   POST api/profile
// @desc    Create user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('avatar'), (req, res) => {

    const {errors, isValid} = validateProfileInput(req.body);

    if (!isValid) {
        return res.status(404).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.github) profileFields.github = req.body.github;
    if (req.body.userImg) profileFields.userImg = req.body.userImg;

    // skills split into array
    if (typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',');
    }

    //Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;


    Profile.findOne({user: req.user.id})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (profile) {


                if (req.file) {
                    User
                        .findById(profile.user._id)
                        .then(user => {
                            cloudinary.v2.uploader.upload(req.file.path)
                                .then(image => {
                                    user.avatar = image.secure_url;
                                    user
                                        .save()
                                        .then(() => {
                                            // Update profile
                                            Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields})
                                                .then(profile => {
                                                    res.json(profile)
                                                })
                                                .catch(err => console.log(err));

                                        })
                                })
                        });
                } else {
                    // Update profile
                    Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields})
                        .then(profile => {
                            res.json(profile)
                        })
                        .catch(err => console.log(err));
                }


            } else {
                // Create profile
                // check if handlee exist
                Profile.findOne({handle: profileFields.handle})
                    .then(handle => {
                        if (profile) {
                            errors.handle = 'Handle already exists';
                            res.status(404).json(errors);
                        }

                        // Save Profile

                        new Profile(profileFields).save()
                            .then(profile => {
                                res.json(profile);
                            })
                            .catch(err => console.log(err));


                    })


            }
        })


});


// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {

    const errors = {};

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there are no profile for this users';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => {
            res.status(404).json(err);
            console.log(err);
        });
});


// @route   GET api/profile/user/user_id
// @desc    Get profile by user_id
// @access  Public
router.get('/user/:user_id', (req, res, next) => {
    const errors = {};
    Profile
        .findById(req.params.user_id)
        .populate('user')
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'there are no profile for this users';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(err => next(err));
});


// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofiles = 'There are no profiles';
                res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({profiles: 'There are no profiles'});
        })
});


// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
        const {errors, isValid} = validateExperienceInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({user: req.user.id}).then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
    }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
        const {errors, isValid} = validateEducationInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({user: req.user.id}).then(profile => {
            const newExp = {
                school: req.body.school,
                degree: req.body.degree,
                city: req.body.city,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add to exp array
            profile.education.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
    }
);


// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience to profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req, res) => {

        Profile.findOne({user: req.user.id})
            .then(profile => {
                const removeIndex = profile.experience
                    .map(item => item.id)
                    .indexOf(req.params.exp_id);

                if (removeIndex !== -1) {

                    profile.experience.splice(removeIndex, 1);

                    profile.save()
                        .then(profile => {
                            res.json(profile);
                        })
                } else {
                    res.json(profile);
                }
            })
            .catch(err => res.json(err));
    }
);


// @route   DELETE api/profile/education/:exp_id
// @desc    Delete education to profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req, res) => {

        Profile.findOne({user: req.user.id})
            .then(profile => {

                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.edu_id);

                if (removeIndex !== -1) {
                    profile.education.splice(removeIndex, 1);

                    profile.save()
                        .then(profile => {
                            res.json(profile);
                        })
                } else {
                    res.json(profile);
                }


            })

            .catch(err => res.json(err));
    }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({user: req.user.id})
        .then(() => {
            User.findOneAndRemove({_id: req.user.id})
                .then(() => {
                    res.json({success: true});
                })
        })
});


module.exports = router;
