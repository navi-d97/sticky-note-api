import express, { json, urlencoded } from 'express';
import { createServer } from "http";
import cors from 'cors'
import { Server } from "socket.io";
import pingRoute from './ping';

import stickyNotesRoute from './Routes/stickyNotes.route';
import { onConnection } from './socket';

const app = express();
const port = 8000;
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use('/stickyNotes', stickyNotesRoute);
app.use('/ping', pingRoute)

const httpServer = createServer(app);
export const io = new Server(httpServer, {
  cors: {
    origin: "ec2-50-17-162-1.compute-1.amazonaws.com",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  onConnection(socket);
});

httpServer.listen(port, () => { console.log(`server listening on port ${port}`) });