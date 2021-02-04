import express from "express";

import { Server } from 'socket.io';
import Terminal from './services/terminal';
import SocketEvents from './constants'

const app = express();
const port = 8888;
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Initialize socket server
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on(SocketEvents.CONNECTION, (socket) => {
  console.log('User connected!', socket.id);
  try {
    socket.emit(SocketEvents.DATA, '\r\n*** CONNECTION ESTABLISHED ***\r\n\r\n'); //successfuly connection
    const terminal = new Terminal(socket);

    socket
      .on(SocketEvents.CLOSE, () => {
        socket.emit(SocketEvents.DATA, '\r\n\r\n*** CONNECTION CLOSED ***\r\n');
      }).on(SocketEvents.DISCONNECT, () => {
        console.log('Client disconnected', socket.id);
      });
  } catch (err) {
    socket.emit(
      SocketEvents.DATA,
      `\r\n*** CONNECTION ERROR: ${err.toString()} ***\r\n`
    );
  }
});

app.get("/", (req, res) => res.send("Hello World!"));