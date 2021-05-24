const { getAllTasksByBoard, getTask, createTask, updateTaskInBoard, removeTask } = require('../../common/inMemoryDb');

const getAll = async boardId => {
  const tasks = await getAllTasksByBoard(boardId);

  if (!tasks[0]) {
    return false
  }
  return tasks;
};

const get = async id => {
  const task = await getTask(id);
  if (!task) {
    return false
  }
  return task;
};

const create = task => createTask(task);

const update = async (boardId, id, task) => {
  const updatedTask = await updateTaskInBoard(boardId, id, task);
  if (!updatedTask) {
    return false
  }
  return updatedTask;
};

const remove = async (boardId, id) => {
  const task = await removeTask(boardId, id);
  if (!task) {
    return false
  }
  return true;
};

module.exports = { getAll, get, create, update, remove };
