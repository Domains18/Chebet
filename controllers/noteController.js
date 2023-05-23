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


const updateNote = expressAsyncHandler(async (req, res) => { 
    const { id, user, title, text, completed } = req.body;

    if(!id || !user || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }
    const duplicate = await Note.findOne({ title }).lean().exec()
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'Note already exists' });
    }
    note.title = title;
    note.text = text;
    note.completed = completed;
    const updatedNote = await note.save();
    updatedNote ? res.status(200).json({ message: `Note ${title} succesfully updated` }) : res.status(400).json({ message: 'Invalid note data' });
})

const deleteNote = expressAsyncHandler(async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const note = await Note.findById(id).exec();
    if (!note) {
        return res.status(404).json({ message: 'Note not found' });
    }   
    const deletedNote = await note.deleteOne();
})




module.exports = { getAllNotes, createNewNote, updateNote, deleteNote }
