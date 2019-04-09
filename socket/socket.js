const Message = require('../models/Message');
const Room = require('../models/ChatRoom');
const passport = require('passport');

module.exports = io => {
    io.on('connect', function (socket) {
        socket.emit('connected', 'You are connected to socket.io');

        socket.on('getAllMessages', () => {
            Message
                .find({})
                .limit(30)
                .sort({$natural: -1})
                .sort({_id: -1})
                .then(messages => {

                    messages.sort((a, b) => {
                        return new Date((a.date)) - new Date((b.date));
                    });

                    io.emit('history', messages);
                })
                .catch(err => {
                    console.log(err);
                })
        }),


        socket.on('msg', msg => {

            const newMessage = new Message({
                message: msg.message,
            });

            newMessage.save()
                .then(() => {
                    io.emit('message', newMessage);
                })
                .catch(err => {
                    console.log(err);
                });

        })




        // small chat
        socket.on('GET_ALL_MESSAGES', data => {
            const {_id} = data;
            console.log(_id, 'this is id');

            Message
                .find({room: _id})
                .then(messages => {
                    socket.emit('SET_ALL_MESSAGES', messages)
                })
                .catch(err => {
                    console.log(err);
                })



        });

        socket.on('add-message', data => {
            const {message, room, user} = data;

            const newMessage = new Message({
                message,
                room,
                user
            });

            // console.log(newMessage);

            newMessage.save()
                .then(res => {
                    io.emit('added-message', res);
                })
                .catch(err => {
                    console.log(err);
                });

        })


    });
};