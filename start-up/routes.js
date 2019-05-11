module.exports = app => {
    app.use('/api/auth', require('../routes/api/auth'));
    app.use('/api/users', require('../routes/api/users'));
    app.use('/api/profile', require('../routes/api/profile'));
    app.use('/api/posts', require('../routes/api/post'));
    app.use('/api/admin', require('../routes/api/admin'));
    app.use('/api/upload', require('../routes/api/upload'));
    app.use('/api/blog', require('../routes/api/blog'));
    app.use('/api/task', require('../routes/api/task'));
    app.use('/api/fake', require('../routes/api/fake'));
    app.use('/api/calendar', require('../routes/api/calendar'));
    app.use('/api/pass', require('../routes/api/pass'));
    app.use('/api/test', require('../routes/api/test'));
};






