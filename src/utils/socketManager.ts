import { Application } from 'express';
import io from 'socket.io';
import { Server } from 'http';

export function socketManager(app: Application) {
  const server = new Server(app);
  const serverSocket = io(server);
  server.listen(process.env.SOCKET_PORT || 4000);

  serverSocket.on('connection', socket => {
    let room;
    socket.on('room', data => {
      room = data;
      socket.join(data);
    });

    socket.on('voteSubmission', data => {
      socket.to(room).emit('voteChanged', data);
    });
  });
}
