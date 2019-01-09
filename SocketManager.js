const io = require('./server').io;
const {createUser} = require('./Factories');
const {USER_CONNECTED} = require('./config/socket_keys');

const connectedUsers = [];

module.exports = function (socket) {
    console.log("SocketID: ", socket.id);


    // User connecting
    socket.on(USER_CONNECTED, user => {
        const newUser = createUser(user);

        //add unique to arr
        const index = connectedUsers.findIndex((e) => e.name === newUser.name);
        if (index === -1) connectedUsers.push(newUser);

        console.log(connectedUsers); 
    })

};
