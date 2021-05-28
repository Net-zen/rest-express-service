import express from 'express';
import Board from './board.model';
import boardService from './board.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    res.json(await boardService.getAll());
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.get(req.params.id);
    return res.json(board);
  } catch (e) {
    return res.status(404).json(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardService.create(new Board({ ...req.body }));
    return res.status(201).json(board);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardService.update(req.params.id, req.body);
    return res.json(board);
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const removeSuccess = await boardService.remove(req.params.id);
  if (removeSuccess) return  res.sendStatus(204);
  return res.status(404);
});

export default router;
