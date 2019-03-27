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
      return res.status(400).json({ error: 'Permission denied' });
    });
};

router.all('*', requireAuth);

// Get all Notes
router.get('/', (req, res, next) => {

  model
    .getByOwner(req.app.get('db'), req.user.id)
    .then((notes) => {

      res.status(200).json(notes);
    })
    .catch(next);
});

// Create new note
router.post('/', express.json(), (req, res, next) => {

  const payload = {
    owner_id   : req.user.id,
    body       : req.body.body,
    visibility : req.body.visibility,
  };

  model
    .createNote(req.app.get('db'), payload)
    .then((noteId) => {

      // res.location(`${req.protocol}://${req.hostname}/notes/${noteId}`);
      res.status(200).json();
    })
    .catch(next);
});

// Get existing note
router.get('/:noteId', verifyOwnership, (req, res, next) => {

  model
    .getById(req.app.get('db'), req.params.noteId)
    .then((notes) => {

      res.status(200).json(notes);
    })
    .catch(next);
});

// Update existing note
router.patch('/:noteId', verifyOwnership, express.json(), (req, res, next) => {

  model
    .updateNote(req.app.get('db'), req.params.noteId, req.body)
    .then(() => {

      res.status(204).json();
    })
    .catch(next);
});

// Delete exiting note
router.delete('/:noteId', verifyOwnership, (req, res, next) => {

  model
    .deleteNote(req.app.get('db'), req.params.noteId)
    .then(() => {

      res.status(204).json();
    })
    .catch(next);
});

module.exports = router;
