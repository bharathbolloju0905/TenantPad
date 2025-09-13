const express = require('express');
const router = express.Router();

const { createNote, getNotes, updateNote, deleteNote,getNotesDetails } = require('../controllers/notes.controllers');
const authenticateUser = require('../middlewares/authenticate.midleware');
router.post('/', authenticateUser, createNote);
router.get('/', authenticateUser, getNotes);
router.get('/:id', authenticateUser, getNotesDetails);
router.put('/:id', authenticateUser, updateNote);
router.delete('/:id', authenticateUser, deleteNote);


module.exports = router;