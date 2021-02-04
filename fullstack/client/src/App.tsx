import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';

import './App.css';

const SERVER_URI = 'http://127.0.0.1:8888';
const socket = io(SERVER_URI);
const fitAddon = new FitAddon();

function App() {
  const xtermRef = useRef<any>();

  useEffect(() => {
    fitAddon.fit(); // fullscreen mode for terminal
    socket.on('data', (data: any) => {
      xtermRef.current.terminal.write(data);
    });
  }, []);

  return (
    <div className="app">
      <XTerm
        ref={xtermRef}
        addons={[fitAddon]}
        onData={(e) => {
          socket.emit('command', e);
        }}
      />
    </div>
  );
}

export default App;
