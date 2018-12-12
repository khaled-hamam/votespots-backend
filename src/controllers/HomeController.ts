import { Application, Request, Response } from 'express';
import { IController } from './IController';
import { ApiError } from '../utils/ApiError';

export default class HomeController implements IController {
  public register(app: Application): void {
    app.get('/', this.ping);
  }

  private ping(req: Request, res: Response) {
    throw new ApiError('Test', 404);
    res.json('Hello World!');
  }
}
