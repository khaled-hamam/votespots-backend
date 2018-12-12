import { Application, Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

import { ApiError } from './../utils/ApiError';
import { IController } from './IController';
import { validateRegisterInput } from '../utils/validation/Register';
import { User } from '../models/User';

export class UserController implements IController {
  public register(app: Application) {
    app.post('/api/register', this.registerUser);
  }

  private async registerUser(req: Request, res: Response) {
    const { isValid, msg } = validateRegisterInput(req.body);
    if (isValid === false) {
      throw new ApiError(msg, 400);
    }

    const foundUser = User.find({ email: req.body.email });
    if (foundUser) {
      throw new ApiError('User already registered.', 400);
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  }
}
