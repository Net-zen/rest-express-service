import express from 'express';
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
    return res.status(404).json(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.create(
      new User({ ...req.body }));
    return res.status(201).json(User.toResponse(user));
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

router.route('/:id').put( async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, { ...req.body });
    return res.json(User.toResponse(user));
  } catch (e) {
    return res.status(400).json(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(204);
});

export default router;
