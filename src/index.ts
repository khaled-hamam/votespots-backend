import { ApiError } from './utils/ApiError';
import Server from './Server';
import { connect } from 'mongoose';

const server: Server = new Server();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/votespots';
connect(
  MONGO_URI,
  err => {
    if (err) {
      throw new ApiError('Cannot connect to mongodb', 500);
    }

    console.log('Connected to mongodb successfully');
  }
);
export default server;
