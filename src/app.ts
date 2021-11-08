import express, {json, urlencoded} from 'express';
import { createServer } from "http";
import { Server } from "socket.io";
import pingRoute from './ping';

import stickyNotesRoute from './Routes/stickyNotes.route';
import { onConnection } from './socket';

const app = express();
const port = 8000;
app.use(urlencoded({ extended: true }));
app.use(json());

app.use('/stickyNotes', stickyNotesRoute);
app.use('/ping', pingRoute)

const httpServer = createServer(app);
export const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  onConnection(socket);
});

httpServer.listen(port,()=>{console.log(`server listening on port ${port}`)});