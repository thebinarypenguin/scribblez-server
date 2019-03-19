
const getAllNotes = function (db) {

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .orderBy('id');
};

const getNote = function (db, noteId) {

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('notes.id', noteId)
    .then((rows) => {
      return rows[0];
    });
};

const createNote = function (db, createPayload) {

  return db
    .insert(createPayload)
    .into('notes')
    .returning('id')
    .then((ids) => {
      return ids[0];
    });
};

const updateNote = function (db, noteId, updatePayload) {

  return db('notes')
    .update(updatePayload)
    .where('id', noteId);
};

const replaceNote = function (db, noteId, replacePayload) {

  return db('notes')
    .update(replacePayload)
    .where('id', noteId);
};

const deleteNote = function (db, noteId) {

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
