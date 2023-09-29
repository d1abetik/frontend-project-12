import { createContext, useContext } from 'react';

export const SocketContext = createContext({});

export const useApi = () => useContext(SocketContext);
