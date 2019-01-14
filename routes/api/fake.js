const express = require('express');
const router = express.Router();

const Fake = require('../../models/FakeData');
const fakePerPage = 25;


router.get('/', (req, res) => {

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
                        console.log(err);
                    });

        })
        .catch(err => {
            console.log(err);
        })
});

module.exports = router;
