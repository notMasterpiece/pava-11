const CronJob = require('cron').CronJob;
const Fake = require('../models/FakeData');
const faker = require('faker');


const webpush = require('web-push');

const publicVapidKey = 'BB_V6M62UHo8FJt9mLc8rGSO1hOlfigisc4-ol8EcJSlwSPGgsrphb-k8XLqTw81MaX5DNyr5QHXT1YOhpIHtd4';
const privateVapidKey = '2SXC5-XoI3JJrRtUP8GLPNB6rrrwcB4jPqW5vp_jNeo';

module.exports = () => {
    const job = new CronJob('0 */2 * * *', function () {


            // const newFaker = new Fake({
            //     name: faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"),
            //     email: faker.fake("{{internet.email}}"),
            //     password: faker.fake("{{internet.password}}"),
            //     avatar: faker.fake("{{image.avatar}}"),
            //     date: faker.fake("{{date.past}}")
            // });

            // newFaker.save()
            //     .then(post => {
            //
            //     });


            webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
            const payload = JSON.stringify({title: 'Чи знаєш ти українських художниць: Київ прикрасили картинами вітчизняних мисткинь Рух HeForShe у партнерстві з Національним художнім музеєм (NAMU) створили публічну виставку картин відомих українських художниць.'});

            webpush.sendNotification(
                {
                    endpoint: 'https://fcm.googleapis.com/fcm/send/ds43dMwmCII:APA91bHvPcVL7MHxUwYFwOfVyngMZYWqcHMtI6DMkLN_A_dt2DjZC6hThKl-YKG8fqZZLWX61Se1ouB8Lt9sBDSfrMLoB4WpvehToMPnCXzmfCKhlhNdl-oOBn4ZxPyvrVoAZQQRnf-2',
                    expirationTime: null,
                    keys:
                        {
                            p256dh:
                                'BGev9cTUk9fjzLfPjI4FDTM2tkz2vTIqetFraFPogRG4px8i282OrLiPE6u58APfIjbDtPABiBszPPUX43TCYfs',
                            auth: '12fwcJjsj6fVa0REL8iWpg'
                        }
                }, payload)
                .catch(err => {
                    console.log(err);
                })


        }, function () {
            /* This function is executed when the job stops */
        },
        true /* Start the job right now */
    );
};




