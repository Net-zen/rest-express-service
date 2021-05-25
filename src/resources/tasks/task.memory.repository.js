/**
 * Module task.memory.repository
 * @module taskMemoryRepository
 */
const { getAllTasksByBoard, getTask, createTask, updateTaskInBoard, removeTask } = require('../../common/inMemoryDb');

/**
 * Get all tasks by board id from db
 * @param {string} boardId - board id where tasks bound to
 * @returns {Promise<boolean|Object[]>} - return all tasks bound to board or false
 */
const getAll = async boardId => {
  const tasks = await getAllTasksByBoard(boardId);

  if (!tasks[0]) {
    return false
  }
  return tasks;
};

/**
 * Get task by id from db and check if task exist
 * @param {string} id task id
 * @returns {Promise.<Object|false>} - task or false
 */
const get = async id => {
  const task = await getTask(id);
  if (!task) {
    return false
  }
  return task;
};

/**
 * Add new task to db
 * @param {Object} task - task id
 * @returns {Promise<Object|false>} - added task or false
 */
const create = task => createTask(task);

/**
 * Updates task in db
 * @param {string} boardId -  board id where tasks bound to
 * @param {string} id - updatable task id
 * @param {Object} task - new task data for update
 * @returns {Promise<Object|false>} updated task or false
 */
const update = async (boardId, id, task) => {
  const updatedTask = await updateTaskInBoard(boardId, id, task);
  if (!updatedTask) {
    return false
  }
  return updatedTask;
};

/**
 * Removes task from db
 * @param {string} boardId - board id where tasks bound to
 * @param {string} id - removable task id
 * @returns {Promise<boolean>} - true if task removed or false
 */
const remove = async (boardId, id) => {
  const task = await removeTask(boardId, id);
  if (!task) {
    return false
  }
  return true;
};

module.exports = { getAll, get, create, update, remove };
