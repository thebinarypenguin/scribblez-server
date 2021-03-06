
const getGlobalFeed = function (db) {

  return db
    .select('notes.id', 'users.real_name', 'users.username AS owner', 'notes.body', 'notes.visibility', 'notes.created_at', 'notes.updated_at')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('visibility', 'public')
    .orderBy('notes.updated_at', 'DESC');
};

const getUserFeed = function (db, username) {

  // TODO validate username

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility', 'notes.created_at', 'notes.updated_at')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('visibility', 'public')
    .andWhere('users.username', username)
    .orderBy('notes.updated_at', 'DESC');
};

module.exports = {
  getGlobalFeed,
  getUserFeed,
};
