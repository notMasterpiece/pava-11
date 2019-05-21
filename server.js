require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');

const socketIO = require('socket.io');


const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const session = require('express-session');

const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolves');


const app = express();

const server = http.createServer(app);
const io = socketIO(server);

app.use(function(req, res, next) {
    res.redirect("https://" + req.headers.host + req.url);
    next();
});


app.set('io', io);

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


// socket 
require('./socket/socket')(io); 

// passport MIDD
app.use(passport.initialize());
require('./middleware/auth/passport')(passport);


app.use(session({
    secret: process.env.AUTH_SEKRET,
    resave: true,
    saveUninitialized: true
}));

// ALL ROUTES
require('./start-up/routes')(app);

app.use('/graphql', graphqlHttp({
    schema: graphqlSchema,
    rootValue: graphqlResolver
}));


if(process.env.NODE_ENV === 'production') {

    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log('catch page not fount');
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);

    console.log(err.message);
    res.json({
        name: err.message,
        status: err.status || 500
    });
});

// mongo
require('./start-up/mongo')();

// run cron
require('./start-up/cron')();

// post
require('./start-up/port')(server);