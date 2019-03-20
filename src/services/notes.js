const getByOwner = function (db, userId) {

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('notes.owner_id', userId)
    .orderBy('id');
};

const getById = function (db, noteId) {

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

const verifyUserOwnsNote = function (db, userId, noteId) {

  return db
    .select('id')
    .from('notes')
    .where('owner_id', userId)
    .andWhere('id', noteId)
    .then((rows) => {
      if (rows.length === 0) {
        throw new Error('User does not own note');
      }
    });
};

module.exports = {
  getByOwner,
  getById,
  createNote,
  updateNote,
  replaceNote,
  deleteNote,
  verifyUserOwnsNote,
};
