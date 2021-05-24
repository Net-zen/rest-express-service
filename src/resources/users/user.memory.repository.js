const { getAllUsers, getUser, createUser, updateUser, removeUser } = require('../../common/inMemoryDb');

const getAll = () => getAllUsers();

const get = async id => {
  const user = await getUser(id);
  if (!user) {
    return false
  }
  return user;
};

const create = user => createUser(user);

const update = (id, user) => updateUser(id, user);

const remove =  id => removeUser(id);

module.exports = { getAll, get, create, update, remove };
