const User = require('../models/Users');


module.exports = io => {
    io.on('connection', socket => {
        console.log('User connected');


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

            io.to(message.room).emit('SERVER_NEW_CHAT_MSG', message);

        });



        socket.on('disconnect', socket => {
            console.log('DISCONNECT', socket.id);
            // set current user online : false
        });

    });

};