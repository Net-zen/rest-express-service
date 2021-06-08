import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
      const users = await usersService.getAll();
      res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    return res.json(User.toResponse(user));
  } catch (e) {
    return res.status(StatusCodes.NOT_FOUND).json(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(
      new User({ ...req.body }));
    return res.status(StatusCodes.CREATED).json(User.toResponse(user));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(e.message);
  }
});

router.route('/:id').put( async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, { ...req.body });
    return res.json(User.toResponse(user));
  } catch (e) {
    return res.status(StatusCodes.BAD_REQUEST).json(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  const removeSuccess = await usersService.remove(req.params.id);
  if (removeSuccess) {
    return  res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
  }
  return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
});

export default router;
