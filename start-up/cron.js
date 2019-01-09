const CronJob = require('cron').CronJob;
const Fake = require('../models/FakeData');
const faker = require('faker');

module.exports = () => {
    const job = new CronJob('*/5 * * * * *', function() {


        const newFaker = new Fake({
            name: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
            email: faker.fake("{{internet.email}}"),
            password: faker.fake("{{internet.password}}"),
            avatar: faker.fake("{{image.avatar}}"),
            date: faker.fake("{{date.past}}")
        });

        newFaker.save()
            .then(post => {});





        console.log(newFaker);


        }, function () {
            /* This function is executed when the job stops */
        },
        true /* Start the job right now */
    );
};




