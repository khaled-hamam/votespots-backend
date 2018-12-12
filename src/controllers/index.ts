import { UserController } from './UserController';
import { IController } from './IController';
import HomeController from './HomeController';

const controllers: IController[] = [new HomeController(), new UserController()];

export default controllers;
