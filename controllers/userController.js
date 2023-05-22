const User = require('../models/User');
const Note = require('../models/Note');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');


const getAllUser = expressAsyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(404).json({ message: 'No users found' });
    }
    res.json(users);
});

const createNewUser = expressAsyncHandler(async (req, res) => {

    const { userName, password, roles } = req.body;
    if (!userName || !password || !Array.isArray(roles) || roles.length === 0) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await User.findOne({ userName }).lean().exec()
    if (duplicate) {
        return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userObject = { userName, password: hashedPassword, roles };
    const user = await User.create(userObject);

    if (user) {
        res.status(201).json({ message: `New User ${userName} succesfully created` });

    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }

});

const updateUser = expressAsyncHandler(async (req, res) => {

    const { id, userName, password, roles, active } = req.body;
    if (!id || !userName  || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findById(id).exec();
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const duplicate = await User.findOne({ userName }).lean().exec()
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({ message: 'User already exists' });
    }

    user.userName = userName;
    user.roles = roles;
    user.active = active;

    if (password) {
        user.password = await bcrypt.hash(password, 10);
    }
    const updatedUser = await user.save();
    res.json({ message: 'User updated', user: updatedUser });
});


const deleteUser = expressAsyncHandler(async (req, res) => {

    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    const notes = await Note.findOne({ user: id }).lean().exec();
    if (notes?.length) {
        return res.status(400).json({ message: 'User has assigned notes, cannot delete' });
    }
    const user = await User.findByIdAndDelete(id).exec();
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }
    const result = await user.deleteOne();
    const reply = `username ${result.userName} with ID ${result._id} deleted`;
    res.json(reply);
});




module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser
}
