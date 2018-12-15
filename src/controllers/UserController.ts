import { Application, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { ApiError } from './../utils/ApiError';
import { IController } from './IController';
import { validateRegisterInput } from '../utils/validation/register';
import { User } from '../models/User';
import { validateLoginInput } from '../utils/validation/login';

export class UserController implements IController {
  public register(app: Application) {
    app.post('/api/register', this.registerUser);
    app.post('/api/login', this.loginUser);
    app.get('/api/user/:id', this.findUser);
  }

  private async registerUser(req: Request, res: Response) {
    const { isValid, msg } = validateRegisterInput(req.body);
    if (isValid === false) {
      throw new ApiError(msg, 400);
    }

    const [foundUser] = await User.find({ email: req.body.email });
    if (foundUser) {
      throw new ApiError('User already registered.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  }

  private async loginUser(req: Request, res: Response) {
    const { isValid, msg } = validateLoginInput(req.body);
    if (isValid === false) {
      throw new ApiError(msg, 400);
    }

    const [foundUser] = await User.find({ email: req.body.email });
    if (!foundUser) {
      throw new ApiError('Wrong email or password', 400);
    }

    const isEqual = await bcrypt.compare(req.body.password, foundUser.password);
    if (isEqual === false) {
      throw new ApiError('Wrong email or password', 400);
    }

    const payload = JSON.stringify({
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email
    });

    const secret = process.env.JWT_SECRET || 'JWT_SECRET';
    const token = jwt.sign(payload, secret);
    res.json({ token });
  }

  private async findUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      res.json({ id: user._id, email: user.email, name: user.name });
    } catch (error) {
      throw new ApiError('User not found', 400);
    }
  }
}
