const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');

router.route('/').get(async (req, res) => {
    res.json(await taskService.getAll(req.params.boardId));
});

router.route('/:id').get(async (req, res) => {
    const task = await taskService.get(req.params.id);
  if (!task) {
    return res.sendStatus(404)
  }
  return res.json(task)
});

router.route('/').post(async (req, res) => {
  const task = await taskService.create(
    new Task({ ...req.body, boardId: req.params.boardId })
  );
  if (!task) {
    return res.sendStatus(400)
  }
  return res.status(201).json(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await taskService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  if (!task) {
    return res.sendStatus(404)
  }
  return res.json(task)
});

router.route('/:id').delete(async (req, res) => {
  await taskService.remove(req.params.boardId, req.params.id);
  res.sendStatus(204);
});

module.exports = router;
