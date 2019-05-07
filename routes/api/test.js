const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth/auth');

router.get('/', auth, (req, res) => {
    console.log(req);
});


module.exports = router;