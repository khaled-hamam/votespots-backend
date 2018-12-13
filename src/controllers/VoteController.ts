import { Application, Request, Response } from 'express';
import { IController } from './IController';
import { ApiError } from '../utils/ApiError';
import { Vote } from '../models/Vote';
import { validateVoteInput } from '../utils/validation/vote';

export default class VoteController implements IController {
  public register(app: Application): void {
    app.get('/api/vote/:id', this.findVote);
    app.post('/api/vote/', this.createVote);
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
  private async createVote(req: Request, res: Response) {
    const { isValid, msg } = validateVoteInput(req.body);

    if (isValid === false) {
      throw new ApiError(msg, 400);
    }
    const vote = new Vote(req.body);
    vote.results = new Array(vote.headers.length);
    vote.results.forEach(element => {
      element = 0;
    });
    const newVote = await vote.save();
    res.status(201).json(newVote);
  }
  private async SubmitVote(req: Request, res: Response) {
    let vote;
    try {
      vote = await Vote.findById({ _id: req.params.id });
    } catch (error) {
      throw new ApiError('vote not found.', 404);
    }

    let headerIndex = vote.headers.indexOf(req.params.header);
    if (headerIndex == -1) {
      throw new ApiError('header not found.', 404);
    } else {
      vote.results[headerIndex]++;
      res.status(201).end();
    }
  }
}
