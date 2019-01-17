const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'files/blog');
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
        }
    }),
    fileFilter: (req, file, cb) => {

        if( !file.mimetype.match(/jpe|jpeg|png|gif$i/)) {
            cb(new Error('file type is bad'), false);
            return;
        }

        cb(null, true);
    }
});
