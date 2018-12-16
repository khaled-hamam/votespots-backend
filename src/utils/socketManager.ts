import { Server } from 'http';
import io from 'socket.io';

export function socketManager(server: Server) {
  const serverSocket = io(server);

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
