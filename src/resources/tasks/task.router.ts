import express from 'express';
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
    return res.status(404).json(e.message);
  }
});

router.route('/').post(async (req:express.Request<IRequestParams>, res) => {
  try {
    const task = await taskService.create(
      new Task({ ...req.body, boardId: req.params.boardId }));
    return res.status(201).json(task);
  } catch (e) {
    return res.status(400).json(e.message);
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
    return res.status(400).json(e.message);
  }
});

router.route('/:id').delete(async (req:express.Request<IRequestParamsId>, res) => {
  const removeSuccess = await taskService.remove(req.params.boardId, req.params.id);
  if (removeSuccess) return  res.sendStatus(204);
  return res.status(404);
});

export default router;
