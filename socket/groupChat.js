const User = require('../models/Users');
const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');
const PMessage = require('../models/PrivateMessage');


module.exports = io => {
    io.on('connection', socket => {
        console.log('User connected');

        let findBoolean = false,
            findRoom = null;



        socket.on('USER_CONNECT', user => {
            console.log('CONNECT USER BY ID', user);

            User.findByIdAndUpdate(user,
                {
                    $set: { online: true }
                })
                    .then(() => {})
                    .catch( err => console.log(err))
        });


        socket.on('JOIN_ROOM', (room, callback) => {

            socket.join(room);
            console.log(`user join to room ${room}`);

            User
                .find()
                .sort({online: -1})
                .then(users => {
                    io.to(room).emit('SERVER_ALL_USERS', users);
                });


            callback();
        });

        socket.on('NEW_CHAT_MSG', message => {

            console.log(message);
            io.to(message.room).emit('SERVER_NEW_CHAT_MSG', message);

        });



        socket.on('disconnect', socket => {
            console.log('DISCONNECT', socket.id);
            // set current user online : false
        });







        // private

        socket.on('PRIVATE_CONNECT', users => {

            const {myId, userId} = users;

            console.log(myId, 'myID');
            console.log(userId, 'userID');


            PMessage
                .find({'sender': myId, 'receiver': userId})
                .lean()
                .populate('sender', ['name','avatar'])
                .populate('receiver', ['name','avatar'])
                .exec()
                .then(messages => {
                    console.log(messages.length, 'length');
                    socket.emit('SET_FIRST_MESSAGES', messages);
                })

        });



        socket.on('NEW_PRIVATE_MESSAGE', data => {
            const newPrivateMessage = new PMessage({
                message: data.message,
                sender: data.sender,
                receiver: data.receiver
            });

            newPrivateMessage
                .save()
                .then(msg => {
                    PMessage
                        .findById(msg.id)
                        .lean()
                        .populate('sender', ['name', 'avatar'])
                        .populate('receiver', ['name', 'avatar'])
                        .exec()
                        .then(messages => {
                            console.log(messages);
                            socket.emit('SET_PRIVATE_MESSAGE', messages);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        });
    });

};