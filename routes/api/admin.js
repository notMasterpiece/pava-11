const express = require('express');
const router = express.Router();
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

const Post = require('../../models/Post');

const passport = require('passport');


// for pdf
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');




// @route GET api/posts
// @desc GET post
// @access Public
router.get('/comments', (req,res) => {

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





router.get('/pdf', (req, res) => {

    // const user = {
    //     id: "5c3648986b75601f0097114e",
    //     name: "Pankiv Vasul",
    //     email: "grawdanin@mail.ua"
    // };
    //
    // const pdfName = Date.now().toString();
    // const pdfPath = path.join('pdf', pdfName);
    //
    // const pdfDoc = new PDFDocument();
    // pdfDoc.info.Title = `[PAVA] - ${pdfName}`;
    //
    //
    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader(
    //   'Content-Disposition',
    //   'filename="' + pdfName + '"'
    // );
    //
    //
    // pdfDoc.pipe(fs.createWriteStream(pdfPath));
    // pdfDoc.pipe(res);
    //
    // pdfDoc.text('Hello world');
    // pdfDoc
    //     .fontSize(20)
    //     .text('lorem', {
    //         underline: true
    //     });
    //
    // // # Add another page
    // pdfDoc.addPage()
    //     .fontSize(25)
    //     .text('...', 100, 100);
    //
    // pdfDoc.end();

});


module.exports = router;
