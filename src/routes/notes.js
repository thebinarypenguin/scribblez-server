const express = require('express');
const model   = require('../services/notes');

const router = express.Router();

router.all('*', requireAuth);

// Get all Notes
router.get('/', (req, res) => {

  model
    .getAllNotes(req.app.get('db'))
    .then((notes) => {

      res.status(200).json(notes);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Create new note
router.post('/', express.json(), (req, res) => {

  model
    .createNote(req.app.get('db'), req.body)
    .then((noteId) => {

      // FIXME get full url
      res.location(`${req.originalUrl}/notes/${noteId}`);
      res.status(200).json(noteId);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Get existing note
router.get('/:noteId', (req, res) => {

  model
    .getNote(req.app.get('db'), req.params.noteId)
    .then((notes) => {

      res.status(200).json(notes);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Update existing note
router.patch('/:noteId', express.json(), (req, res) => {

  model
    .updateNote(req.app.get('db'), req.params.noteId, req.body)
    .then(() => {

      res.status(204).json();
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Replace exiting note
router.put('/:noteId', express.json(), (req, res) => {

  model
    .replaceNote(req.app.get('db'), req.params.noteId, req.body)
    .then(() => {

      res.status(204).json();
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Delete exiting note
router.delete('/:noteId', (req, res) => {

  model
    .deleteNote(req.app.get('db'), req.params.noteId)
    .then(() => {

      res.status(204).json();
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

module.exports = router;
