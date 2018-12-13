import { Application, Request, Response } from 'express';
import { IController } from './IController';
import { ApiError } from '../utils/ApiError';
import { Vote } from '../models/voteSchema';

export default class VoteController implements IController {
  public register(app: Application): void {
    app.get('/api/vote/:id', this.findVote);
    app.post('/api/vote', this.createVote);
    app.post('/api/vote/:id', this.SubmitVote);
  }

  private findVote(req: Request, res: Response) {
    /*const vote = Vote.findById(req.params.id);
    if (!vote) {
      throw new ApiError('vote not found.', 404);
    }

    res.send(vote);*/
  }
  private createVote(req: Request, res: Response) {
    //const vote = new Vote(req.body);
    //vote.save();
  }
  private SubmitVote(req: Request, res: Response) {}
}
