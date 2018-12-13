import { Application, Request, Response } from 'express';
import { IController } from './IController';
import { ApiError } from '../utils/ApiError';
import { Vote } from '../models/Vote';
import { validateVoteInput } from '../utils/validation/vote';

export default class VoteController implements IController {
  public register(app: Application): void {
    app.get('/api/vote/:id', this.findVote);
    app.post('/api/vote', this.createVote);
    app.post('/api/vote/:id/:header', this.SubmitVote);
  }

  private async findVote(req: Request, res: Response) {
    let vote;
    try {
      vote = await Vote.findById({ _id: req.params.id });
    } catch (error) {
      throw new ApiError('vote not found.', 404);
    }
    const reqVote = {
      name: vote.name,
      header: vote.headers,
      results: vote.results
    };

    res.json(reqVote);
  }
  private createVote(req: Request, res: Response) {
    const { isValid, msg } = validateVoteInput(req.body);
    if (isValid === false) {
      throw new ApiError(msg, 400);
    }
    const vote = new Vote(req.body);
    vote.save();
    res.status(200).json(vote);
  }
  private async SubmitVote(req: Request, res: Response) {
    //request fe  vote id we headers
    let vote;
    try {
      vote = await Vote.findById({ _id: req.params.id });
    } catch (error) {
      throw new ApiError('vote not found.', 404);
    }
    let count = 0;
    let isFound = false;
    for (const i in vote.headers) {
      if (req.params.header == i) {
        vote.results[count]++;
        isFound = true;
        break;
      }
      count++;
    }
    if (!isFound) {
      throw new ApiError('header not found.', 404);
    }
  }
}
