import { Application, Request, Response } from 'express';
import { IController } from './IController';
import { ApiError } from '../utils/ApiError';
import { Vote } from '../models/Vote';
import { validateVoteInput } from '../utils/validation/vote';
import { pick } from 'lodash';

export default class VoteController implements IController {
  public register(app: Application): void {
    app.get('/api/vote/:id', this.findVote);
    app.post('/api/vote/', this.createVote);
    app.post('/api/vote/:id/:header', this.SubmitVote);
    app.get('/api/votes', this.recentVotes);
  }

  private async findVote(req: Request, res: Response) {
    let vote;
    try {
      vote = await Vote.findById(req.params.id);
      const reqVote = {
        _id: vote._id,
        name: vote.name,
        headers: vote.headers,
        results: vote.results
      };
      res.json(reqVote);
    } catch (error) {
      throw new ApiError('vote not found.', 404);
    }
  }

  private async createVote(req: Request, res: Response) {
    req.body.headers = req.body.headers.map(e => e.trim()).filter(e => e !== '');
    const { isValid, msg } = validateVoteInput(req.body);

    if (isValid === false) {
      throw new ApiError(msg, 400);
    }
    const vote = new Vote(req.body);

    vote.results = new Array();
    for (let i = 0; i < vote.headers.length; ++i) {
      vote.results[i] = 0;
    }

    const newVote = await vote.save();
    res.status(201).json(newVote);
  }

  private async SubmitVote(req: Request, res: Response) {
    let vote;
    try {
      vote = await Vote.findById(req.params.id);
      if (!vote) {
        throw new ApiError('vote not found.', 400);
      }
    } catch (error) {
      throw new ApiError('vote not found.', 400);
    }

    const headerIndex = vote.headers.indexOf(req.params.header);
    if (headerIndex === -1) {
      throw new ApiError('header not found.', 400);
    } else {
      vote.results[headerIndex]++;
      await Vote.findByIdAndUpdate(vote._id, vote);
      res.status(201).end();
    }
  }

  private async recentVotes(req: Request, res: Response) {
    let votes = [];
    try {
      votes = await Vote.find({})
        .sort([['createdAt', -1]])
        .limit(10);

      votes.map(vote => pick(vote, ['_id', 'name', 'headers', 'results']));
    } catch (error) {
      throw new ApiError('No available votes', 400);
    }
    res.status(201).json(votes);
  }
}
