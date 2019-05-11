const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/Users');
const { check, validationResult } = require('express-validator/check');

const auth = require('../../middleware/auth/auth');


const addSocketIdtoSession = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next();
};


// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        next(err);
    }
});



// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: {
                    _id: user._id
                }
            };
            jwt.sign(
                payload,
                process.env.AUTH_SEKRET,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token });
                }
            );
        } catch (err) {
            next(err)
        }
    }
);



// @route    GET api/auth/facebook
// @desc     Authenticate user by facebook
// @access   Public
router.get('/facebook', addSocketIdtoSession, passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    const io = req.app.get('io');
    jwt.sign(req.user, process.env.AUTH_SEKRET, {expiresIn: 36000}, (err, token) => {
        if (err) throw err;
        io.in(req.session.socketId).emit('facebook', {token});
        res.end();
    });

});


// @route    GET api/auth/google
// @desc     Authenticate user by google
// @access   Public
router.get('/google', addSocketIdtoSession, passport.authenticate('google', {scope: ['profile']}));
router.get('/google/callback', passport.authenticate('google', {scope: ['profile']} ), async (req, res) => {
    const io = req.app.get('io');
    jwt.sign(req.user, process.env.AUTH_SEKRET, {expiresIn: 36000}, (err, token) => {
        if (err) throw err;
        io.in(req.session.socketId).emit('google', {token});
        res.end();
    });
});



// @route    GET api/auth/github
// @desc     Authenticate user by github
// @access   Public
router.get('/github', addSocketIdtoSession, passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    const io = req.app.get('io');
    jwt.sign(req.user, process.env.AUTH_SEKRET, {expiresIn: 36000}, (err, token) => {
        if (err) throw err;
        io.in(req.session.socketId).emit('github', {token});
        res.end();
    });
});




// @route    GET api/auth/linkedin
// @desc     Authenticate user by linkedin
// @access   Public
router.get('/linkedin', addSocketIdtoSession, passport.authenticate('linkedin'));
router.get('/linkedin/callback', passport.authenticate('linkedin'), (req, res) => {
    const io = req.app.get('io');
    jwt.sign(req.user, process.env.AUTH_SEKRET, {expiresIn: 36000}, (err, token) => {
        if (err) throw err;
        io.in(req.session.socketId).emit('linkedin', {token});
        res.end();
    });
});



module.exports = router;