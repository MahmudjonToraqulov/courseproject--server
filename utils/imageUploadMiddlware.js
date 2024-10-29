const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const storage = multer.memoryStorage();
const upload = multer({ storage });

const imageUploadMiddleware = async (req, res, next) => {
    try{
        const file = req.file;
        if (!file) {
            return next();
        }
        cloudinary.uploader.upload_stream({ transformation: { width: 1000 } }, (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Image upload failed.' });
            }
            req.body.imageUrl = result.secure_url;
            next()
        }).end(file.buffer);
    }
    catch(error){
        return res.status(500).json({ message: 'Image upload failed.' });
    }
};

// Export a single middleware combining both multer and Cloudinary
const imageUploadMiddlware = [
    upload.single('file'), // Handle file upload with multer
    imageUploadMiddleware // Handle Cloudinary upload
];

module.exports = imageUploadMiddlware;