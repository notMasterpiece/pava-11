const User = require('../models/Users');
const Profile = require('../models/Profile');
const ChatRoom = require('../models/ChatRoom');
const PMessage = require('../models/PrivateMessage');

let globalRoom;


module.exports = io => {
    io.on('connection', socket => {
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

            Profile
                .find()
                .populate('user')
                .select('_id user')
                .then(profiles => {
                    profiles.sort((a, b) => b.user.online - a.user.online);
                    io.to(room).emit('SERVER_ALL_USERS', profiles);
                });


            callback();
        });

        socket.on('NEW_CHAT_MSG', message => {

            // console.log(message);
            io.to(message.room).emit('SERVER_NEW_CHAT_MSG', message);

        });



        socket.on('disconnect', socket => {
            console.log('DISCONNECT', socket.id);
            // set current user online : false
        });







        // private 15.04.2019

        socket.on('PRIVATE_CONNECT', users => {

            const {myId, userId} = users;

            // console.log(myId, 'myID');
            // console.log(userId, 'userID');

            ChatRoom
                .findOne({ users: { $all: [ myId , userId ] } })
                .then(room => {
                    if( room ) {

                        globalRoom = room;
                        socket.join(globalRoom._id);

                        // console.log(`room found ${globalRoom._id}`);

                        User
                            .findById(userId)
                            .then(user => {
                                if(!user) return;
                                // io.to(globalRoom._id).emit('SET_PRIVATE_USER_INFO', user);
                                io.to(`${socket.id}`).emit('SET_PRIVATE_USER_INFO', user);
                            });

                        PMessage
                            .find({room: globalRoom._id})
                            .populate('user')
                            .sort('createdAt')
                            .then(messages => {
                                if( !messages.length ) return io.to(globalRoom._id).emit('SET_PRIVATE_ROOM_NO_MESSAGES');

                                io.to(globalRoom._id).emit('SET_FIRST_MESSAGES', messages);
                            })
                            .catch(err => {
                                console.log(err);
                            })


                    } else {


                        // console.log('create new room');

                        const newChatRoom = ChatRoom({
                            name: 'New Room',
                            users: [ myId , userId ],
                            private: true
                        });

                        newChatRoom
                            .save()
                            .then(room => {

                                globalRoom = room;
                                socket.join(globalRoom._id);

                                User
                                    .findById(userId)
                                    .then(user => {
                                        if(!user) return;

                                        // io.to(globalRoom._id).emit('SET_PRIVATE_USER_INFO', user);
                                        io.to(`${socket.id}`).emit('SET_PRIVATE_USER_INFO', user);
                                    });

                                PMessage
                                    .find({room: globalRoom._id})
                                    .populate('user', ['avatar'])
                                    .select('message user icon createdAt _id')
                                    .then(messages => {

                                        if( !messages.length ) return io.to(globalRoom._id).emit('SET_PRIVATE_ROOM_NO_MESSAGES');

                                        io.to(globalRoom._id).emit('SET_FIRST_MESSAGES', messages);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    })


                            })

                    }
                })
                .catch(err => {
                    console.log(err);
                });
        });


        socket.on('NEW_PRIVATE_MESSAGE', data => {

            const newPrivateMessage = new PMessage({
                message: data.message,
                user: data.user,
                room: globalRoom._id
            });

            newPrivateMessage
                .save()
                .then(message => {
                    PMessage
                        .findById(message._id)
                        .populate('user', ['avatar'])
                        .select('message user icon createdAt _id')
                        // .exec()
                        .then(message => {
                            // console.log(messages);
                            io.to(globalRoom._id).emit('SET_PRIVATE_MESSAGE', message);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        });



        socket.on('TYPING', () => {
            socket.broadcast.emit('SERVER_TYPING');
        });



        socket.on('ADD_IMAGE', data => {

            const newPrivateMessage = new PMessage({
                message: '',
                icon: data.icon,
                user: data.user,
                room: globalRoom._id
            });

            newPrivateMessage
                .save()
                .then(message => {
                    PMessage
                        .findById(message._id)
                        .populate('user', ['avatar'])
                        .select('message user icon createdAt _id')
                        // .exec()
                        .then(message => {
                            // console.log(message, 'icon');
                            io.to(globalRoom._id).emit('SET_PRIVATE_MESSAGE', message);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        });



    });

};