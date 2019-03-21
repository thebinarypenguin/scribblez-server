const express = require('express');
const model   = require('../services/notes');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const verifyOwnership = function (req, res, next) {

  const db     = req.app.get('db');
  const userId = req.user.id;
  const noteId = req.params.noteId;

  model
    .verifyUserOwnsNote(db, userId, noteId)
    .then(() => {
      next();
    })
    .catch((err) => {
      return res.status(400).json({ error: 'permission denied' });
    });
};

router.all('*', requireAuth);

// Get all Notes
router.get('/', (req, res) => {

  model
    .getByOwner(req.app.get('db'), req.user.id)
    .then((notes) => {

      res.status(200).json(notes);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Create new note
router.post('/', express.json(), (req, res) => {

  const payload = {
    owner_id   : req.user.id,
    body       : req.body.body,
    visibility : req.body.visibility,
  };

  model
    .createNote(req.app.get('db'), payload)
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
router.get('/:noteId', verifyOwnership, (req, res) => {

  model
    .getById(req.app.get('db'), req.params.noteId)
    .then((notes) => {

      res.status(200).json(notes);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Update existing note
router.patch('/:noteId', verifyOwnership, express.json(), (req, res) => {

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
router.put('/:noteId', verifyOwnership, express.json(), (req, res) => {

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
router.delete('/:noteId', verifyOwnership, (req, res) => {

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
