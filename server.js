const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const express = require('express');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
require('dotenv').config();





//load routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const admin = require('./routes/api/admin');
const upload = require('./routes/api/upload');
const fake = require('./routes/api/fake');
const blog = require('./routes/api/blog');



// bodyParser MIDD
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/files', express.static(path.join(__dirname, 'files')));



require('./socket/socket')(io);


// passport MIDD
app.use(passport.initialize());
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', post);
app.use('/api/admin', admin);
app.use('/api/upload', upload);
app.use('/api/blog', blog);
app.use('/api/fake', fake);


// app.use((error, req, res) => {
//     console.log(error);
//     console.log('global error');
//     res.statusCode(500).json({global_error: true, error});
// });





if(process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}



// mongo
require('./start-up/mongo')();

// run cron
// require('./start-up/cron')();

// post
require('./start-up/port')(server);
