const express = require('express');
const router = express.Router();

const Message = require('../../models/Message');
const Fake = require('../../models/FakeData');
const fakePerPage = 25;


router.get('/', (req, res, next) => {

    const page = +req.query.page || 1;
    let totalFake;

    Fake
        .find()
        .countDocuments()
        .then( numFake => {

            totalFake = numFake;

            return Fake
                    .find()
                    .skip( (page - 1) * fakePerPage)
                    .limit(fakePerPage)
                    .then(fake => {
                        res.json({
                            totalFake,
                            currentPage: page,
                            hasNextPage: fakePerPage * page < totalFake,
                            hasPreviosPage: page > 1,
                            nextPage: page + 1,
                            previosPage: page - 1,
                            lastPage: Math.ceil(totalFake / fakePerPage),
                            fake
                        })
                    })
                    .catch( err => {
                        next(err)
                    });

        })
        .catch(err => {
            next(err)
        })
});



router.get('/io', (req, res) => {
    Message
        .find({})
        .limit(10)
        .sort({$natural: -1})
        .then(messages => {

            const filterMessages = {
                messages: messages.sort((a, b) => {
                    return new Date((a.date)) - new Date((b.date));
                })
            };

            res.status(200).json(filterMessages);
        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;
