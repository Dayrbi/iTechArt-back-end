import { Response, Request } from 'express';
import { CustomRequest } from '../middleware/auth.middlewars';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('config');
const User = require('../models/User.ts');

exports.create = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;
    const douplicate = await User.findOne({ email });

    if (douplicate) {
      res.status(400).send('User already exist');
      return;
    }
    const hashedPassword: String = await bcrypt.hash(password, 12);
    const user = new User({ email, username, password: hashedPassword });

    await user.save();
    const token = jwt.sign(
      { userId: user.id },
      conf.get('tokenSecret'),
      { expiresIn: '1h' },
    );
    res.status(201).send({ token });
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
exports.login = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).send('User is not exist');
      return;
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send('Forbidden');
      return;
    }
    const token = jwt.sign(
      { userId: user.id },
      conf.get('tokenSecret'),
      { expiresIn: '1h' },
    );
    res.send({ token });
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
exports.authUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.headers.authorization && req.headers.authorization?.split(' ')[0] === 'Bearer') {
      res.status(401).send('Forbidden');
      return;
    }
    const token = req.headers.authorization?.split(' ')[1];
    const decode = jwt.verify(token, conf.get('tokenSecret'));
    const { userId } = decode;
    res.status(200).send({ userId });
  } catch (e) {
    const msg = (e as Error).message;
    res.status(500).send(msg);
  }
};
