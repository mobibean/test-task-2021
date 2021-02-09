import os from 'os';
import * as pty from 'node-pty';
import SocketEvents from '../constants'
import SocketIO from 'socket.io';

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'zsh'; // zsh or bash

function Terminal(socket: SocketIO.Server) {
  this.terminal = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env,
  });

  this.terminal.on('data', function (data: string) {
    // console.log('@@@', data);
    socket.emit(SocketEvents.DATA, data);
  });

  socket.on(SocketEvents.COMMAND, (command: string) => {
    this.terminal.write(command);
  });
}

export default Terminal;