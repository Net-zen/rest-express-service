/**
 * Module task.service
 * This module requires module task.memory.repository
 * @requires module:./task.memory.repository
 * @module taskService
 */
const taskRepo = require('./task.memory.repository');

/**
 * Get all tasks by board id from db
 * @param {string} boardId - board id where tasks bound to
 * @returns {Promise.<Object[]|false>} - return all tasks bound to board or false
 */
const getAll = boardId => taskRepo.getAll(boardId);

/**
 * Get task by id from db.
 * @param {string} id task id
 * @returns {Promise.<Object|false>} - task or false
 */
const get = id => taskRepo.get(id);

/**
 * Add new task to db
 * @param {Object} task - task id
 * @returns {Promise.<Object|false>} - added task or false
 */
const create = task => taskRepo.create(task);

/**
 * Updates task in db
 * @param {string} boardId -  board id where tasks bound to
 * @param {string} id - updatable task id
 * @param {Object} task - new task data for update
 * @returns {Promise.<Object|false>} updated task or false
 */
const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

/**
 * Removes task from db
 * @param {string} boardId - board id where tasks bound to
 * @param {string} id - removable task id
 * @returns {Promise.<boolean>} - true if task removed or false
 */
const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, get, create, update, remove };
