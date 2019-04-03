const express = require('express');
const router = express.Router();
const passport = require('passport');
const ChatRoom = require('../../models/ChatRoom');

// router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
//
// });

router.post('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    const { user } = req.body;
    const { id } = req.user;


    let findBoolean = false,
        findRoom = null;

    ChatRoom
        .find({})
        .then(rooms => {
            rooms.forEach( room => {
                if ( room.users.includes(user, id)) {
                    findBoolean = true;
                    findRoom = room;
                    return
                }
            });


            if (findBoolean) {
                console.log(findRoom, 'room OLREADY created');
                res.json({chatRoom: findRoom});

            } else {

                console.log('created new chat room');
                const newChatRoom = new ChatRoom({
                    users : [user, req.user.id]
                });

                newChatRoom
                    .save()
                    .then(room => {
                        res.json({room})
                    })
                    .catch(err => next(err));

            }

        })
        .catch(err => next(err));
});

module.exports = router;
