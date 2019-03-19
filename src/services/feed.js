
const getGlobalFeed = function (db) {

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('visibility', 'public')
    .orderBy('id');
};

const getUserFeed = function (db, username) {

  return db
    .select('notes.id', 'users.username AS owner', 'notes.body', 'notes.visibility')
    .from('notes')
    .leftJoin('users', 'users.id', '=', 'notes.owner_id')
    .where('visibility', 'public')
    .andWhere('users.username', username)
    .orderBy('id');
};

module.exports = {
  getGlobalFeed,
  getUserFeed,
};
