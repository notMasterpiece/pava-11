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

const test = require('./routes/api/test');



// bodyParser MIDD
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use('/files', express.static(path.join(__dirname, 'files')));


//	Check for HTTPS
//
app.use(force_https);


//	Remove the information about what type of framework is the site running on
app.disable('x-powered-by');



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

app.use('/api/test', test);


// app.use((error, req, res) => {
//     console.log(error);
//     console.log('global error');
//     res.statusCode(500).json({global_error: true, error});
// });


function force_https(req, res, next)
{
    //
    //	1. 	Redirect only in the production environment
    //
    if(process.env.NODE_ENV == 'production')
    {
        //
        //	1. 	Check what protocol are we using
        //
        if(req.headers['x-forwarded-proto'] !== 'https')
        {
            //
            //	-> 	Redirect the user to the same URL that he requested, but
            //		with HTTPS instead of HTTP
            //
            return res.redirect('https://' + req.get('host') + req.url);
        }
    }

    //
    //	2. 	If the protocol is already HTTPS the, we just keep going.
    //
    next();
}




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
