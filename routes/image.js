const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../modules/Image');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});

let fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null,true);
    } else {
        cb(null,false);
    }
}
  
let upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.post(
    '/uploadmulter',
    upload.single('imageName'),
    async(req,res) => {
        try {
            console.log(req.file)
            let newImage = new Image({
                imageOriginalname: req.file.originalname,
                imageName: req.file.fieldname,
                imageData: req.file.path
            });
            await newImage.save();
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }   
);

router.get(
    '/getImages',
    async(req,res) => {
        try {
            let images = await Image.find();
            res.json(images)
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Server Error..." });
        }
    }
);

router.get(
    '/getImage/:image_data',
    async(req,res) => {
        let image = await Image.findOne({ imageOriginalname: req.params.image_data });
        res.json(image);
    }
)

module.exports = router;