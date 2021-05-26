/**
 * Module user.service
 * This module requires module user.memory.repository
 * @requires module:./user.memory.repository
 * @module userService
 */
const usersRepo = require('./user.memory.repository');

/**
 * Get all users from db
 * @returns {Promise.<Object[]|array>} - all users or empty array
 */
const getAll = () => usersRepo.getAll();

/**
 * Get user by id from db
 * @param {string} id - user id
 * @returns {Promise<Object|false>} - user or false
 */
const get = id => usersRepo.get(id);


/**
 * Add new user to db
 * @param {Object} user - user id
 * @returns {Promise.<Object|false>} - added user or false
 */
const create = user => usersRepo.create(user);

/**
 * Updates user in db
 * @param {string} id - updatable user id
 * @param {Object} user - new user data for update
 * @returns {Promise.<Object|false>} updated user or false
 */
const update = (id, user) => usersRepo.update(id, user);

/**
 * Removes user from db
 * @param {string} id - removable user id
 * @returns {Promise.<boolean>} - true if user removed or false
 */
const remove =  id => usersRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
