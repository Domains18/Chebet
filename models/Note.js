const mongoose = require('mongoose');




const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide a user']
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: [50, 'Title cannot be more than 50 characters']
    },
    text: {
        type: String,
        required: [true, 'Please provide a text'],
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });


module .exports = mongoose.model('Note', noteSchema);
