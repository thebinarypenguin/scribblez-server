const getByOwner = function (db, userId) {

  // TODO validate userId

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility', 'notes.created_at', 'notes.updated_at')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('notes.owner_id', userId)
    .orderBy('notes.updated_at', 'DESC')
    .orderBy('id');
};

const getById = function (db, noteId) {

  // TODO validate noteId

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility', 'notes.created_at', 'notes.updated_at')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('notes.id', noteId)
    .orderBy('notes.updated_at', 'DESC')
    .then((rows) => {
      return rows[0];
    });
};

const createNote = function (db, createPayload) {

// TODO validate createPayload

  return db
    .insert(createPayload)
    .into('notes')
    .returning('id')
    .then((ids) => {
      return ids[0];
    });
};

const updateNote = function (db, noteId, updatePayload) {

  // TODO validate noteId
  // TODO validate updatePayload

  return db('notes')
    .update(updatePayload)
    .where('id', noteId);
};

const deleteNote = function (db, noteId) {

  // TODO validate noteId

  return db
    .delete()
    .from('notes')
    .where('id', noteId);
};

const verifyUserOwnsNote = function (db, userId, noteId) {

  // TODO validate userId
  // TODO validate noteId

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
  deleteNote,
  verifyUserOwnsNote,
};
