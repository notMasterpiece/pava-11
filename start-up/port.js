const PORT = process.env.PORT || 8080;
module.exports = server => {
    server.listen(PORT, ()=> {
        console.log(`App start on port ${PORT}`);
    });
};
