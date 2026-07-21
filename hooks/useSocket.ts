import { useEffect, useState, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001';

interface TypingStatus {
  dealId: string;
  typingUsers: string[];
  isTyping: boolean;
}

export const useSocket = (dealId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!dealId) {
      console.log('No dealId provided, skipping socket connection');
      return;
    }

    console.log(`Connecting to Socket.IO server at: ${SOCKET_URL}`);
    console.log(`With dealId: ${dealId}`);

    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      query: { dealId },
      path: '/socket.io/',
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected successfully');
      setIsConnected(true);
      socketInstance.emit('join-room', dealId);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
      
      if (error.message?.includes('websocket') || error.message?.includes('WebSocket')) {
        console.log('Falling back to polling transport...');
        socketInstance.io.opts.transports = ['polling', 'websocket'];
        socketInstance.connect();
      }
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
      setTypingUsers([]);
    });

    socketInstance.on('reconnect', (attemptNumber) => {
      console.log(`Socket reconnected after ${attemptNumber} attempts`);
      setIsConnected(true);
      if (dealId) {
        socketInstance.emit('join-room', dealId);
      }
    });

    socketInstance.on('reconnect_error', (error) => {
      console.error('Socket reconnection error:', error);
    });

    // Handle typing status updates
    socketInstance.on('typing-status', (data: TypingStatus) => {
      console.log('Typing status update:', data);
      setTypingUsers(data.typingUsers);
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    return () => {
      console.log('Cleaning up socket connection');
      if (socketRef.current) {
        socketRef.current.removeAllListeners();
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setSocket(null);
      setIsConnected(false);
      setTypingUsers([]);
    };
  }, [dealId]);

  // Function to emit typing status
  const emitTyping = (isTyping: boolean, userName: string) => {
    if (!socketRef.current || !isConnected || !dealId) return;

    socketRef.current.emit('typing', {
      dealId,
      userName,
      isTyping,
    });
  };

  return { 
    socket, 
    isConnected, 
    typingUsers,
    emitTyping 
  };
};