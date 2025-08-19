import { Server as NetServer, Socket } from 'net';
import { NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
}

export interface LocationData {
  latitude: number;
  longitude: number;
}

export interface LocationUpdate {
  id: string;
  latitude: number;
  longitude: number;
}
