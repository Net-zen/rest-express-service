const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
    res.json(await boardService.getAll());
});

router.route('/:id').get(async (req, res) => {
  const board = await boardService.get(req.params.id)
    if (!board) {
      return res.sendStatus(404)
    }
    return res.json(board)
});

router.route('/').post(async (req, res) => {
    const board = await boardService.create(new Board({ ...req.body }));
    if (!board) {
      return res.sendStatus(400)
    }
    return res.status(201).json(board);
});

router.route('/:id').put(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    if (!board) {
      return res.sendStatus(404)
    }
    return res.json(board)
});

router.route('/:id').delete(async (req, res) => {
  await boardService.remove(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
