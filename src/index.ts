import { ApiError } from './utils/ApiError';
import Server from './Server';
import { connect } from 'mongoose';

const server: Server = new Server();
connect(
  'mongodb://localhost/votespots',
  err => {
    if (err) {
      throw new ApiError('Cannot connect to mongodb', 500);
    }

    console.log('Connected to mongodb successfully');
  }
);
export default server;
