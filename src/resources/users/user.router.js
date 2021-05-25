const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.get(req.params.id);
  if (!user) {
    return res.sendStatus(404)
  }
  return res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(
    new User({...req.body}));
  res.status(201).json(User.toResponse(user));
});

router.route('/:id').put( async (req, res) => {
  const user = await usersService.update(req.params.id, { ...req.body });
  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(204);
});

module.exports = router;