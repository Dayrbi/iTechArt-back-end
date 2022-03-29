import { Response, Request } from 'express';
import bcrypt from 'bcrypt';
import conf from 'config';
import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { CustomRequest } from '../middleware/auth.middlewars'

exports.create  = async (req: CustomRequest, res: Response): Promise<void>  => {
  try {
    const { email, password, username } = req.body;
    const duplicate = await User.findOne({ email });
    if (duplicate) {
      res.status(400).send('User already exist');
      return;
    }
    const hashedPassword: String = await bcrypt.hash(password, 12);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    const token = await jwt.sign(
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
      res.status(400).send('User doesn\'t exist');
      return;
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send('Forbidden');
      return;
    }
    const token = await jwt.sign(
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
    const decode = await jwt.verify(token, conf.get('tokenSecret'));
    const { userId } = decode;
    res.status(200).send({ userId });
  } catch (e) {
      const msg = (e as Error).message;
      res.status(500).send(msg);
  }
};
