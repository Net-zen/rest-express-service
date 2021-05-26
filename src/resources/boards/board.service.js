/**
 * Module board.service
 * This module requires module board.memory.repository
 * @requires module:./board.memory.repository
 * @module boardService
 */
const boardRepo = require('./board.memory.repository');

/**
 * Get all boards from db
 * @returns {Promise.<Object[]|array>} - all boards or empty array
 */
const getAll = () => boardRepo.getAll();

/**
 * Get board by id from db
 * @param {string} id board id
 * @returns {Promise.<Object|false>} - board or false
 */
const get = id => boardRepo.get(id);

/**
 * Add new board to db
 * @param {Object} board - board id
 * @returns {Promise.<Object|false>} - added board or false
 */
const create = board => boardRepo.create(board);

/**
 * Updates board in db
 * @param {string} id - updatable board id
 * @param {Object} board - new board data for update
 * @returns {Promise.<Object|false>} updated board or false
 */
const update = (id, board) => boardRepo.update(id, board);

/**
 * Removes board from db
 * @param {string} id - removable board id
 * @returns {Promise.<Object|false>} - board if board removed or false
 */
const remove = id => boardRepo.remove(id);

module.exports = { getAll, get, create, update, remove };
