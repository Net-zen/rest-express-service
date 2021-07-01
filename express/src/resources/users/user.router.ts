import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { toResponse } from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/').get(async (_req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(toResponse));
});

router.route('/:id').get(async (req, res) => {
    const user = await usersService.get(req.params.id);
    return res.json(toResponse(user));
});

router.route('/').post(async (req, res) => {
    const user = await usersService.create({ ...req.body });
    return res.status(StatusCodes.CREATED).json(toResponse(user));
});

router.route('/:id').put( async (req, res) => {
    const user = await usersService.update(req.params.id, { ...req.body });
    return res.json(toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  return res.status(StatusCodes.NO_CONTENT).json(ReasonPhrases.NO_CONTENT);
});

export default router;
