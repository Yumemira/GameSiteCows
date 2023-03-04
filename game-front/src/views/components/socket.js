import io from 'socket.io-client';
import React from 'react';

export const socket = io.connect('http://25.73.147.11:57159')
export const SocketContext = React.createContext()
