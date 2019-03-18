const express = require('express');
const model = require('./model');

const router = express.Router();

router
  .route('/')
  // .all(validateToken)
  .get((req, res) => {

    model
      .getAllNotes(req.app.get('db'))
      .then((notes) => {

        res.status(200).json(notes);
      })
      .catch((err) => {

        res.status(500).json(err);
      });
  })
  .post(express.json(), (req, res) => {

    model
      .createNote(req.app.get('db'), req.body)
      .then((noteId) => {

        // TODO location header
        res.status(200).json(noteId);
      })
      .catch((err) => {

        // TODO 4xx error

        res.status(500).json(err);
      });
  });


router
  .route('/:noteId')
  // .all(validateToken)
  // .all(validateExistence)
  .get((req, res) => {

    model
      .getNote(req.app.get('db'), req.params.noteId)
      .then((notes) => {

        res.status(200).json(notes);
      })
      .catch((err) => {

        res.status(500).json(err);
      });
  })
  .put(express.json(), (req, res) => {

    model
      .replaceNote(req.app.get('db'), req.params.noteId, req.body)
      .then(() => {

        res.status(204).json();
      })
      .catch((err) => {

        // TODO 4xx error

        res.status(500).json(err);
      });
  })
  .patch(express.json(), (req, res) => {

    model
      .updateNote(req.app.get('db'), req.params.noteId, req.body)
      .then(() => {

        res.status(204).json();
      })
      .catch((err) => {

        // TODO 4xx error

        res.status(500).json(err);
      });
  })
  .delete((req, res) => {

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
