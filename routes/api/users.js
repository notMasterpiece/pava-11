const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const transporter = require('../../middleware/mail/mailTransport');
const resetPassTemplate = require('../../middleware/mail/resetPassword');



// load input validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const keys = require('../../config/keys_dev');


const User = require('../../models/Users');



// @route GET api/users/
// @desc Test users route
// @access Public
router.get('/', (req, res) => {
    res.send('users');
});


// @route GET api/users/register
// @desc Test users route
// @access Public
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }



    User.findOne({email: req.body.email})
        .then( user => {
            if( user ) {
                errors.email = 'Email already exists';
                return res.status(400).json({email: 'Email already exists' });
            } else {

                const avatar = gravatar.url(req.body.email, {
                    s: '250',  //size
                    r: 'pg',
                    d: 'mm'
                });


                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                });

                bcrypt.genSalt(10, (err, salt )=> {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});


// @route   GET api/users/login
// @desc    login user / JWT
// @access  Public
router.post('/login', (req,res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }


   const email = req.body.email;
   const password = req.body.password;

   // Find user by email

   User.findOne({ email: email })
       .then(user => {
           // check for users
           if( !user ) {
               errors.email = 'User not found (((';
               return res.status(404).json(errors) // 404 not found
           }

        // Check password
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if( isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar,
                        email: user.email
                    };
                    // User Matched
                    jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, ( err, token ) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        })
                    });
                } else {
                    errors.password = 'Password incorrect';
                    return res.status(404).json(errors);
                }
            })
       })

});


// @route POST api/users/reset password
// @desc  reset password
// @access Private
router.post('/reset-pass', (req,res) => {
    const errors = {},
          mail = req.body.email;

    crypto.randomBytes(32, (err, buffer) => {

       if( err ) return res.status(404).json(err);

       const token = buffer.toString('hex');

       User.findOne({email: req.body.email})
           .then(user => {
               if( !user) {
                   errors.email = 'Користувача не знайдено';
                   return res.status(404).json(errors);
               }

               user.resetToken = token;
               user.resetTokenExpiration = Date.now() + 3600000;

               user.save()
                   .then(() => {
                       transporter.sendMail({
                           to: 'grawdanin@gmail.com',
                           from: 'PAVA',
                           subject: '[PAVA] Please reset your password',
                           html: resetPassTemplate(mail, token)
                       })
                           .then(() => {
                               console.log('send');
                               return res.status(200).json({success: true})
                           })
                           .catch(err => {
                               console.log(err);
                               res.status(404).json({success: false})
                           });
                   })
                   .catch(err => {
                       console.log(err);
                   })


           })
           .catch(err => {
               console.log(err);
           })

    });

});




router.post('/reset-pass/:token' , (req, res) => {

    const {token, r_email} = req.body;

    User.findOne({resetToken: token, resetTokenExpiration: { $gt: Date.now()} })
        .then(user => {

            if(!user) {
                return res.status(400).json({error: 'token are missing'})
            }

            bcrypt.genSalt(10, (err, salt )=> {
                bcrypt.hash(r_email, salt, (err, hash) => {
                    if(err) {
                        console.log(err);
                        throw err;
                    }

                    user.password = hash;
                    user.resetToken = undefined;
                    user.resetTokenExpiration = undefined;
                    user.save()
                        .then(user => {
                            return res.status(200).json(user);
                        })
                        .catch(err => console.log(err));
                })
            })
        })
        .catch(err => {
            console.log(err);
        });

});

//
// // route for facebook authentication and login
// // different scopes while logging in
// router.get('/login/facebook',
//     passport.authenticate('facebook', { scope : 'email' }
//     ));
//
// // handle the callback after facebook has authenticated the user
// router.get('/login/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect : '/home',
//         failureRedirect : '/'
//     })
// );



router.post('/login/facebook', (req, res) => {

    const {name, email, picture, id} = req.body;


    User.findOne({providerID: id})
        .then( user => {
            if( user ) {

                const payload = {
                    id: user._doc._id,
                    name: user._doc.name,
                    email: user._doc.email,
                    avatar: user._doc.avatar
                };

                jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, ( err, token ) => {
                    return res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                });

            } else {

                const newUser = new User({
                    name,
                    email,
                    avatar: picture.data.url,
                    provider: 'facebook',
                    providerID: id
                });

            newUser.save()
                    .then( user => {

                        const payload = {
                            id: user.id,
                            name,
                            email,
                            avatar: picture.data.url
                        };

                        jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, ( err, token ) => {
                            return res.status(200).json({
                                success: true,
                                token: `Bearer ${token}`
                            })
                        });


                    })
                    .catch(err => console.log(err));
            }
        })
});



module.exports = router;






