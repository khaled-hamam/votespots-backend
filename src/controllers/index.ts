import { IController } from './IController';
import HomeController from './HomeController';
import VoteController from './VoteController';

const controllers: IController[] = [new HomeController(), new VoteController()];

export default controllers;
