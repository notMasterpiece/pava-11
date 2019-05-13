const PORT = 8080;
module.exports = (server, app) => {
    server.listen(PORT, ()=> {
        app.set('port', PORT);
        console.log(`App start on port ${PORT}`);
    });
};
