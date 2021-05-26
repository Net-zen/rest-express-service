/**
 * Module user.memory.repository
 * @module userMemoryRepository
 */
const { getAllUsers, getUser, createUser, updateUser, removeUser } = require('../../common/inMemoryDb');

/**
 * Get all users from db
 * @returns {Promise.<Object[]|array>} - all users or empty array
 */
const getAll = () => getAllUsers();

/**
 * Get user by id from db and check if user exist
 * @param {string} id user id
 * @returns {Promise.<Object|false>} - user or false
 */
const get = async id => {
  const user = await getUser(id);
  if (!user) {
    return false
  }
  return user;
};

/**
 * Add new user to db
 * @param {Object} user - user id
 * @returns {Promise.<Object|false>} - added user or false
 */
const create = user => createUser(user);

/**
 * Updates user in db
 * @param {string} id - updatable user id
 * @param {Object} user - new user data for update
 * @returns {Promise.<Object|false>} updated user or false
 */
const update = (id, user) => updateUser(id, user);

/**
 * Removes user from db
 * @param {string} id - removable user id
 * @returns {Promise.<boolean>} - true if user removed or false
 */
const remove =  id => removeUser(id);

module.exports = { getAll, get, create, update, remove };
