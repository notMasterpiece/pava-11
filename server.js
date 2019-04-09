const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolves');




//load routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const post = require('./routes/api/post');
const admin = require('./routes/api/admin');
const upload = require('./routes/api/upload');
const fake = require('./routes/api/fake');
const blog = require('./routes/api/blog');
const task = require('./routes/api/task');
const calendar = require('./routes/api/calendar');
const notification = require('./routes/api/notification');
const chat = require('./routes/api/chat');

const test = require('./routes/api/test');


const app = express();
app.locals.user = null;
const server = http.createServer(app);
const io = socketIO(server);

// bodyParser MIDD
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.use(helmet());
require('./log/morgan')(app);


// static files
app.use('/files', express.static(path.join(__dirname, 'files')));
app.use('/files/blog', express.static(path.join(__dirname, 'files/blog')));
app.use('/files/blog/*', express.static(path.join(__dirname, 'files/blog/*')));


require('./socket/groupChat')(io);


// passport MIDD
app.use(passport.initialize());
require('./config/passport')(passport);


// USE ROUTES
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', post);
app.use('/api/admin', admin);
app.use('/api/upload', upload);
app.use('/api/blog', blog);
app.use('/api/task', task);
app.use('/api/fake', fake);
app.use('/api/calendar', calendar);
app.use('/api/chat', chat);


//test
app.use('/api/test', test);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver
}));


if(process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    console.log(err.message);

    // render the error page
    res.status(err.status || 500);

    res.json({
        name: err.message,
        status: err.status || 500
    });
});


//serviceWorker push notification
// app.use('/api/notification', notification);


// mongo
require('./start-up/mongo')();

// run cron
require('./start-up/cron')();

// post
require('./start-up/port')(server);
