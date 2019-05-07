const express = require('express');
const router = express.Router();
const passport = require('passport');
const CryptoJS = require("crypto-js");
const Password = require('../../models/Password');

const auth = require('../../middleware/auth/auth');

// @route GET api/passwords
// @desc get all passwords
// @access PRIVATE
router.get('/', auth, async (req, res, next) => {

    try {
        const pass = await Password.find({user: req.user._id});
        pass.map(p => {
            p.login = CryptoJS.AES.decrypt(p.login.toString(), process.env.CRYPTO_PASS).toString(CryptoJS.enc.Utf8);
            p.pass = CryptoJS.AES.decrypt(p.pass.toString(), process.env.CRYPTO_PASS).toString(CryptoJS.enc.Utf8);
            p.site = CryptoJS.AES.decrypt(p.site.toString(), process.env.CRYPTO_PASS).toString(CryptoJS.enc.Utf8);
            p.other = CryptoJS.AES.decrypt(p.other.toString(), process.env.CRYPTO_PASS).toString(CryptoJS.enc.Utf8);
        });

        res.json(pass);

    } catch (err) {
        next(err)
    }
});

// @route POST api/pass
// @desc create new pass
// @access PRIVATE
router.post('/', auth, async (req, res, next) => {
    const {site, login, pass, other, _id} = req.body;
    let saved;

    try {

        if (_id) {
            const set = {
                site: CryptoJS.AES.encrypt(site.toString(), process.env.CRYPTO_PASS).toString(),
                login: CryptoJS.AES.encrypt(login.toString(), process.env.CRYPTO_PASS).toString(),
                pass: CryptoJS.AES.encrypt(pass.toString(), process.env.CRYPTO_PASS).toString(),
                other: CryptoJS.AES.encrypt(other.toString(), process.env.CRYPTO_PASS).toString(),
            };

            saved = await Password.findByIdAndUpdate(_id, set,{new: true});

        } else {
            const newPass = new Password({
                user: req.user.id,
                site: CryptoJS.AES.encrypt(site.toString(), process.env.CRYPTO_PASS.toString()),
                login: CryptoJS.AES.encrypt(login.toString(), process.env.CRYPTO_PASS.toString()),
                pass: CryptoJS.AES.encrypt(pass.toString(), process.env.CRYPTO_PASS.toString()),
                other: CryptoJS.AES.encrypt(other.toString(), process.env.CRYPTO_PASS.toString()),
            });

            saved = await newPass.save();

        }


        const result = {
            _id: saved._id,
            site: CryptoJS.AES.decrypt(saved.site.toString(), process.env.CRYPTO_PASS.toString()).toString(CryptoJS.enc.Utf8),
            login: CryptoJS.AES.decrypt(saved.login.toString(), process.env.CRYPTO_PASS.toString()).toString(CryptoJS.enc.Utf8),
            pass: CryptoJS.AES.decrypt(saved.pass.toString(), process.env.CRYPTO_PASS.toString()).toString(CryptoJS.enc.Utf8),
            other: CryptoJS.AES.decrypt(saved.other.toString(), process.env.CRYPTO_PASS.toString()).toString(CryptoJS.enc.Utf8)
        };

        res.json(result);

    } catch (err) {
        next(err);
    }
});


// @route POST api/pass
// @desc delete password
// @access PRIVATE
router.post('/delete/:id', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    try {
        const pass = await Password.findById(req.params.id);

        if (!pass) {
            return res.status(404).json({msg: 'Post not found'});
        }

        // Check user
        if (pass.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        await pass.remove();
        res.json({msg: 'Pass removed'});

    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
