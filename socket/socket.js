const Message = require('../models/Message');

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

    });
};