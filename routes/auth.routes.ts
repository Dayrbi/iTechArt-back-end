const { Router } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const conf = require('config');
const User = require('../models/User.ts');

const router = Router();

router.post('/register', async (req: any, res: any):Promise<void> => {
  try {
    const { email, password, username } = req.body;
    const douplicate = await User.findOne({ email });
    if (douplicate) {
      return res.status(400).send('User already exist');
    }
    const hashedPassword: String = await bcrypt.hash(password, 12);
    const user = new User({ email, username, password: hashedPassword });
    await user.save();
    res.status(201).send('User has been created');
  } catch (error) {
    res.status(500).send('Something is not working');
  }
});
router.post('/login', async (req: any, res: any):Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('User is not exist');
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Forbidden');
    }
    const token = jwt.sign(
      { userId: user.id },
      conf.get('tokenSecret'),
      { expiresIn: '1h' },
    );
    res.send({ token, userId: user.id });
  } catch (e) {
    res.status(500).send('Something is not working');
  }
});
module.exports = router;
