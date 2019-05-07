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
        const user = await User.findById(req.user.id).select('-password');
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
    async (req, res) => {
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
                    id: user.id
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
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);




router.get('/facebook', addSocketIdtoSession, passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook'), req => {
    const io = req.app.get('io');

    const payload = {
        user: {
            _id: user._id
        }
    };
    // User Matched
    jwt.sign(payload, process.env.AUTH_SEKRET, {expiresIn: 36000}, (err, token) => {
        if (err) throw err;
        io.in(req.session.socketId).emit('facebook', {token});
    });

});


module.exports = router;