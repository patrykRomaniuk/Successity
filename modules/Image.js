const mongoose = require('mongoose');

let ImageSchema = mongoose.Schema({
    imageOriginalname: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
});

let Image = mongoose.model('image',ImageSchema);

module.exports = Image;