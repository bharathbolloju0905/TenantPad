const Note = require('../models/note.model');
const User = require('../models/user.model');

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });

    const user = await User.findById(req.user.id).populate('tenant');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const count = await Note.countDocuments({ tenant: user.tenant._id });
    if (count >= 3 && user.tenant.plan === "free") {
      return res.status(403).json({ message: 'Note limit reached for free plan please upgrade your plan' });
    }

    const newNote = await Note.create({
      title,
      content,
      createdBy: user._id,
      tenant: user.tenant._id
    });

    return res.status(201).json(newNote);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating note', error: error.message });
  }
};

const getNotes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('tenant');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const notes = await Note.find({ tenant: user.tenant._id });
    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching notes', error: error.message });
  }
};

const getNotesDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('tenant');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const note = await Note.findOne({ _id: req.params.id, tenant: user.tenant._id });
    if (!note) return res.status(404).json({ message: 'Note not found or not authorized' });

    return res.status(200).json(note);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching note details', error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('tenant');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, tenant: user.tenant._id },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: 'Note not found or not authorized' });
    return res.status(200).json(updatedNote);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating note', error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('tenant');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, tenant: user.tenant._id });
    if (!deletedNote) return res.status(404).json({ message: 'Note not found or not authorized' });

    return res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting note', error: error.message });
  }
};

module.exports = {
  createNote,
  getNotes,
  getNotesDetails,
  updateNote,
  deleteNote
};
