const PORT = process.env.PORT || 5299;
module.exports = server => {
    server.listen(PORT, ()=> {
        console.log(`App start on port ${PORT}`);
    });
};
