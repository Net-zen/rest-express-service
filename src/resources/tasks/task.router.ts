import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import taskService from  './task.service';
import Task from  './task.model';

const router = express.Router({ mergeParams: true });

interface IRequestParams {
  boardId: string;
  id: string;
}

router.route('/').get(async (req:express.Request<IRequestParams>, res) => {
  res.json(await taskService.getAll(req.params.boardId));
});

router.route('/:id').get(async (req, res) => {
  const task = await taskService.get(req.params.id);
  return res.json(task);
});

router.route('/').post(async (req:express.Request<IRequestParams>, res) => {
  const task = await taskService.create(
    new Task({ ...req.body, boardId: req.params.boardId }));
  return res.status(StatusCodes.CREATED).json(task);
});

router.route('/:id').put(async (req:express.Request<IRequestParams>, res) => {
  const task = await taskService.update(
    req.params.boardId,
    req.params.id,
    req.body
  );
  return res.json(task);
});

router.route('/:id').delete(async (req:express.Request<IRequestParams>, res) => {
  await taskService.remove(req.params.boardId, req.params.id);
  return res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
});

export default router;
