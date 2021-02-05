const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, crypto.randomBytes(5).toString('HEX')+"_"+file.originalname);
    }
});

exports.upload = multer({
    
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
});