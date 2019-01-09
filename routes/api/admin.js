const express = require('express');
const router = express.Router();
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const Post = require('../../models/Post');



// @route GET api/posts
// @desc GET post
// @access Public
router.get('/comments', (req,res) => {

    // const fromDate = moment().add(-15, 'days');
    // const toDate = moment().add(15, 'days');
    //
    // const range = moment().range(fromDate, toDate);
    // const diff = range.diff('days');
    //
    // console.log('range', range);
    // console.log('diff', diff);


    Post.find({})
        .then(post => {
            const resuls = [];

            post.forEach(p => {
                resuls.push({
                    comment: p.comments.length,
                    date: moment(p.date).format('L')
                })
            });

            res.json(resuls);
        });
});


module.exports = router;
