import io from 'socket.io-client';
import React from 'react';

export const socket = io.connect('http://25.73.147.11:46291')
export const SocketContext = React.createContext()