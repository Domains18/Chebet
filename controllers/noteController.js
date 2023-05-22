const Note = require('../models/noteModel');
const expressAsyncHandler = require('express-async-handler');



const getAllNotes = expressAsyncHandler(async (req, res) => {
    const notes = await Note.find().lean();
    notes?.lenght ? res.json(notes) : res.status(404).json({ message: 'No notes found' });

    const notesWithUser = await Promise.all(notes.map(async (note) => {
        const user = await User.findById(note.user).lean().exec();
        return { ...note, user: user.userName }
    }))
    res.json(notesWithUser);
})








module.exports = { getAllNotes }
