import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { XTerm } from 'xterm-for-react';
import { FitAddon } from 'xterm-addon-fit';
import './App.css';

const SERVER_URI = 'http://127.0.0.1:8888';
const socket = io(SERVER_URI);
const fitAddon = new FitAddon();

function App() {
  const [connectionError, setConnectionError] = useState<boolean>(false);
  const xtermRef = useRef<any>();

  const updateTerminalData = (data: string) => {
    xtermRef.current.terminal.write(data);
  };

  const handleConnectionError = () => {
    setConnectionError(true);
    socket.disconnect();
    updateTerminalData(
      '\r\n*** Socket connection problem, press r to restart connection ***\r\n'
    );
  };

  const handleChangeTerminalInput = (e: string) => {
    if (connectionError && e === 'r') {
      // reconnect socket server
      setConnectionError(false);
      socket.connect();
      return;
    }
    socket.emit('command', e);
  };

  useEffect(() => {
    fitAddon.fit(); // terminal fullscreen mode
    socket.on('data', updateTerminalData);
    socket.on('connect_error', handleConnectionError);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="app">
      <XTerm
        ref={xtermRef}
        addons={[fitAddon]}
        onData={handleChangeTerminalInput}
      />
    </div>
  );
}

export default App;
