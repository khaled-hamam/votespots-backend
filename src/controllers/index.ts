import { UserController } from './UserController';
import { IController } from './IController';
import HomeController from './HomeController';
import VoteController from './VoteController';

const controllers: IController[] = [
  new HomeController(),
  new VoteController(),
  new UserController()
];

export default controllers;
