/**
 * Module of database in memory
 * @module inMemoryDb
 */

/**
 * Database
 * @type {{boards: Object[], users: Object[], tasks: Object[]}}
 */
const DB = {
  users: [],
  boards: [],
  tasks: []
};

/**
 * Returns shadow copy of all users in db
 * @returns {Promise.<Object[]>} - all users
 */
const getAllUsers = async () => [...DB.users];

/**
 * Returns user by id from db
 * @param {string} id - user id
 * @returns {Promise.<Object|false>} - user or false
 */
const getUser = async id => {
  const foundUsers = DB.users.filter(user => user.id === id);
  if (foundUsers.length > 1) {
    return false;
  }
  return foundUsers[0] || false;
};

/**
 * Add new user to db
 * @param {Object} user - user object
 * @returns {Promise.<Object>} - user added to db
 */
const createUser = async user => {
  DB.users.push(user);
  return getUser(user.id);
};

/**
 * Updating user in db. Returns updated user.
 * @param {string} id - id of updating user
 * @param {Object} user - new user data for update
 * @returns {Promise.<Object|false>} - updated user or false
 */
const updateUser = async (id, user) => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.users[idx] = { id, ...user };
  return { ...DB.users[idx] };
};

/**
 * Removes user by id from db. Unassign all tasks assigned to board.
 * @param {string} id - id of removable user
 * @returns {Promise.<boolean>} - true if user successfully removed or false
 */
const removeUser = async id => {
  const idx = DB.users.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  const userTasks = DB.tasks.filter(task => task.userId === id);
    for (let i = 0; i < userTasks.length; i+= 1) {
      userTasks[i].userId = null;
    }
  DB.users.splice(idx, 1);
  return true;
};

/**
 * Returns shadow copy of all boards in db
 * @returns {Promise.<Object[]>} - all boards
 */
const getAllBoards = async () => [...DB.boards];

/**
 * Returns board by id from db
 * @param {string} id - board id
 * @returns {Promise.<Object|boolean>} - board or false
 */
const getBoard = async id => {
  const foundBoards = DB.boards.filter(board => board.id === id);
  if (foundBoards.length > 1) {
    return false;
  }
  return foundBoards[0] || false;
};

/**
 * Add new board to db
 * @param {Object} board - board object
 * @returns {Promise.<Object>} - board added to db
 */
const createBoard = async board => {
  DB.boards.push(board);
  return getBoard(board.id);
};

/**
 * Updating board in db. Returns updated board.
 * @param {string} id - id of updating board
 * @param {Object} board - new board data for update
 * @returns {Promise.<Object|false>} - updated board or false
 */
const updateBoard = async (id, board) => {
  const idx = DB.boards.findIndex(el => el.id === id);
  if (idx === -1) {
    return false;
  }
  DB.boards[idx] = { ...board };
  return { ...DB.boards[idx] };
};

/**
 * Returns all tasks by board id.
 * @param {string} boardId - id of board where tasks bound to
 * @returns {Promise.<Object[]>} - tasks bound to board
 */
const getAllTasksByBoard = async boardId =>
  DB.tasks.filter(task => task.boardId === boardId);

/**
 * Returns task by id from db
 * @param {string} id - task id
 * @returns {Promise.<Object|false>} - task or false
 */
const getTask = async id => {
  const foundTasks = DB.tasks.filter(task => task.id === id);
  if (foundTasks.length > 1) {
    return false;
  }
  return foundTasks[0] || false;
};

/**
 * Add new task to db
 * @param {Object} task - task object
 * @returns {Promise.<Object>} - task added to db
 */
const createTask = async task => {
  DB.tasks.push(task);
  return getTask(task.id);
};


/**
 * Updating task in db. Returns updated task.
 * @param {string} boardId - id of board where task bound to
 * @param {string} id - id of updating task
 * @param {Object} task - new task data for update
 * @returns {Promise.<Object|false>} - updated task or false
 */
const updateTaskInBoard = async (boardId, id, task) => {
  const idx = DB.tasks.findIndex(el => el.id === id && el.boardId === boardId);
  if (idx === -1) {
    return false;
  }
  DB.tasks[idx] = { ...task };
  return { ...DB.tasks[idx] };
};

/**
 * Removes task bound to board by id from db.
 * @param {string} boardId - board id where task bound to
 * @param {string} id - task id
 * @returns {Promise.<boolean>} - true if task successfully removed or false
 */
const removeTask = async (boardId, id) => {
  const idx = DB.tasks.findIndex(
    task => task.boardId === boardId && task.id === id
  );
  if (idx === -1) {
    return false;
  }
  DB.tasks.splice(idx, 1);
  return true;
};

/**
 * Removes board by id from db. Also removes all tasks bound to board
 * @param {string} id - board id
 * @returns {Promise.<boolean>} - true if board successfully removed or false
 */
const removeBoard = async id => {
  const idx = DB.boards.findIndex(board => board.id === id);
  if (idx === -1) {
    return false;
  }
  DB.tasks
    .filter(task => task.boardId === id)
    .forEach(task => removeTask(id, task.id));
  DB.boards.splice(idx, 1);
  return true;
};

module.exports = { getAllUsers, getUser, createUser, updateUser, removeUser,
                  getAllBoards, getBoard, createBoard, updateBoard, removeBoard,
                  getAllTasksByBoard, getTask, createTask, updateTaskInBoard, removeTask};
