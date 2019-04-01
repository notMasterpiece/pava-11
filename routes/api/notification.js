const express = require('express');
const router = express.Router();
const webpush = require('web-push');

const publicVapidKey = 'BB_V6M62UHo8FJt9mLc8rGSO1hOlfigisc4-ol8EcJSlwSPGgsrphb-k8XLqTw81MaX5DNyr5QHXT1YOhpIHtd4';
const privateVapidKey = '2SXC5-XoI3JJrRtUP8GLPNB6rrrwcB4jPqW5vp_jNeo';



webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

router.post('/', (req, res) => {
    const suscription = req.body;


    console.log(suscription);


    res
        .status(201)
        .json({});

    const payload = JSON.stringify({title: 'This is my small testing ...'});

    webpush.sendNotification(suscription, payload)
        .catch(err => {
            console.log(err);
        })
});


module.exports = router;
