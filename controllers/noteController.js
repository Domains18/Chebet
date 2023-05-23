const Note = require('../models/Note');
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

const createNewNote = expressAsyncHandler(async (req, res) => { 
    const { title, text, user } = req.body;
    if (!title || !text || !user) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await Note.findOne({ title }).lean().exec()
    duplicate ? res.status(409).json({ message: 'Note already exists' }) : null;
    const note = await Note.create({ title, user, text });
    note ? res.status(201).json({ message: `New Note ${title} succesfully created` }) : res.status(400).json({ message: 'Invalid note data' });
});






module.exports = { getAllNotes, createNewNote }
