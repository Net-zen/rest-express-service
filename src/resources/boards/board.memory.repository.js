/**
 * Module board.memory.repository
 * This module requires module inMemoryDb
 * @requires module:../../common/inMemoryDb
 * @module boardMemoryRepository
 */
const { getAllBoards, getBoard, createBoard, updateBoard, removeBoard } = require('../../common/inMemoryDb')

/**
 * Get all boards from db
 * @returns {Promise.<Object[]|array>} - all boards or empty array
 */
const getAll = () => getAllBoards();

/**
 * Get board by id from db and check if board exist
 * @param {string} id board id
 * @returns {Promise.<Object|false>} - board or false
 */
const get = async id => {
  const board = await getBoard(id);
  if (!board) {
    return false
  }
  return board;
};

/**
 * Add new board to db
 * @param {Object} board - board id
 * @returns {Promise.<Object|false>} - added board or false
 */
const create = board => createBoard(board);

/**
 * Updates board in db
 * @param {string} id - updatable board id
 * @param {Object} board - new board data for update
 * @returns {Promise.<Object|false>} updated board or false
 */
const update = async (id, board) => {
  const updatedBoard = await updateBoard(id, board);
  if (!updatedBoard) {
    return false
  }
  return updatedBoard;
};

/**
 * Removes board from db
 * @param {string} id - removable board id
 * @returns {Promise.<Object|false>} - board if board removed or false
 */
const remove = async id => {
  const board = await removeBoard(id);
  if (!board) {
    return false
  }
  return board;
};

module.exports = { getAll, get, create, update, remove }
