import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiRequest, NextApiResponse } from 'next';
import { LocationData } from '@/types/socket';

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server as any);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);

      socket.on('send-location', (data: LocationData) => {
        console.log('Location received from', socket.id, data);
        io.emit('receive-location', {
          id: socket.id,
          ...data,
        });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
        io.emit('user-disconnect', socket.id);
      });
    });
  }

  res.end();
};

export default ioHandler;
