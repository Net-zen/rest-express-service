import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Board from './board.model';
import boardService from './board.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    res.json(await boardService.getAll());
});

router.route('/:id').get(async (req, res) => {
    const board = await boardService.get(req.params.id);
    return res.json(board);
});

router.route('/').post(async (req, res) => {
    const board = await boardService.create(new Board({ ...req.body }));
    return res.status(StatusCodes.CREATED).json(board);
});

router.route('/:id').put(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    return res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardService.remove(req.params.id);
  return  res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
});

export default router;
