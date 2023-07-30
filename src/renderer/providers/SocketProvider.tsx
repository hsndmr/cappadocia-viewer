import React, { createContext, PropsWithChildren } from 'react';
import { socket } from '../lib/socket';

const SocketContext = createContext(socket);

export const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export default function SocketProvider({ children }: PropsWithChildren) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
