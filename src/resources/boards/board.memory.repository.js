const { getAllBoards, getBoard, createBoard, updateBoard, removeBoard } = require('../../common/inMemoryDb')

const getAll = () => getAllBoards();

const get = async id => {
  const board = await getBoard(id);
  if (!board) {
    return false
  }
  return board;
};

const create = board => createBoard(board);

const update = async (id, board) => {
  const updatedBoard = await updateBoard(id, board);
  if (!updatedBoard) {
    return false
  }
  return updatedBoard;
};

const remove = async id => {
  const board = await removeBoard(id);
  if (!board) {
    return false
  }
  return board;
};

module.exports = { getAll, get, create, update, remove }
