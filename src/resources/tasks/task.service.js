const taskRepo = require('./task.memory.repository');

const getAll = boardId => taskRepo.getAll(boardId);

const get = id => taskRepo.get(id);

const create = task => taskRepo.create(task);

const update = (boardId, id, task) => taskRepo.update(boardId, id, task);

const remove = (boardId, id) => taskRepo.remove(boardId, id);

module.exports = { getAll, get, create, update, remove };
