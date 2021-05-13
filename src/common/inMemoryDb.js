const DB = {
  users: []
};

const getAllUsers = async () => [...DB.users];

const getUser = async id => {
  const foundUsers = DB.users.filter(user => user.id === id);
  if (foundUsers.length > 1) {
    throw new Error('Database is corrupted!');
  }
  return foundUsers[0] || false;
};

const createUser = async user => {
  DB.users.push(user);
  return getUser(user.id);
};

const updateUser = async (id, user) => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.users[idx] = { id, ...user };
  return { ...DB.users[idx] };
};

const removeUser = async id => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.users.splice(idx, 1);
  return true;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser };
