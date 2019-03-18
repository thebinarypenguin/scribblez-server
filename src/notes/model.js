const joi  = require('joi');
const boom = require('boom');

// each of these functions should catch any knex (or deeper) errors and throw
// a corresponding boom error.

const getAllNotes = function (db) {

  return db
    .select('*')
    .from('notes')
    .orderBy('id');
};

const getNote = function (db, noteId) {

  // 404 check

  return db
    .select('*')
    .from('notes')
    .where('id', noteId)
    .then((rows) => {
      return rows[0];
    });
};

const createNote = function (db, createPayload) {

  // 400 check

  return db
    .insert(createPayload)
    .into('notes')
    .returning('id')
    .then((ids) => {
      return ids[0];
    });
};

const updateNote = function (db, noteId, updatePayload) {

  // 400 check

  // 404 check

  return db('notes')
    .update(updatePayload)
    .where('id', noteId);
};

const replaceNote = function (db, noteId, replacePayload) {

  // 400 check

  // 404 check

  return db('notes')
    .update(replacePayload)
    .where('id', noteId);
};

const deleteNote = function (db, noteId) {

  // 404 check

  return db
    .delete()
    .from('notes')
    .where('id', noteId);
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  replaceNote,
  deleteNote,
};
