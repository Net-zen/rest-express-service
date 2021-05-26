const { v4: uuid } = require('uuid');

/**
 * Class representing a Task model
 */
class Task {
  /**
   *
   * @param {string} id - task id, generated by uuid v4 by default
   * @param {string} title - task title
   * @param {string} order - task order
   * @param {string} description - task description
   * @param {string|null} userId - id of user, task assigned to
   * @param {string|null} boardId - id of board, task bound to
   * @param {string|null} columnId - id of column, task bound to
   */
  constructor({
    id = uuid(),
    title = 'TASK',
    order = '0',
    description = 'description',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
