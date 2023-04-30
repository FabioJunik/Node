import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp);

export { serverHttp, io };