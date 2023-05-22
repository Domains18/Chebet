const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);



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

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
});


module .exports = mongoose.model('Note', noteSchema);
