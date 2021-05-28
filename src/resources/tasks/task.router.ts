import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import taskService from  './task.service';
import Task from  './task.model';

const router = express.Router({ mergeParams: true });

interface IRequestParams {
  boardId: string;
}
interface IRequestParamsId extends IRequestParams{
  id: string;
}

router.route('/').get(async (req:express.Request<IRequestParams>, res) => {
  res.json(await taskService.getAll(req.params.boardId));
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await taskService.get(req.params.id);
    return res.json(task);
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json(e.message);
  }
});

router.route('/').post(async (req:express.Request<IRequestParams>, res) => {
  try {
    const task = await taskService.create(
      new Task({ ...req.body, boardId: req.params.boardId }));
    return res.status(StatusCodes.CREATED).json(task);
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(e.message);
  }
});

router.route('/:id').put(async (req:express.Request<IRequestParamsId>, res) => {
  try {
    const task = await taskService.update(
      req.params.boardId,
      req.params.id,
      req.body
    );
    return res.json(task)
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(e.message);
  }
});

router.route('/:id').delete(async (req:express.Request<IRequestParamsId>, res) => {
  const removeSuccess = await taskService.remove(req.params.boardId, req.params.id);
  if (removeSuccess) {
    return  res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
  }
  return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
});

export default router;
