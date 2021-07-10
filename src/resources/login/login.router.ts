import express from 'express';
import { FORBIDDEN } from '../../errors/customErrors';
import signToken from './login.service';

const router = express.Router();

router.route('/').post(async (req, res) => {
  const token = await signToken(req.body);
  if (!token) {
    throw new FORBIDDEN('Bad username/password combination');
  }
  res.send(token);
});

export default router;
