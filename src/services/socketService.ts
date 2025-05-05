
import { io, Socket } from 'socket.io-client';
import { toast } from "@/components/ui/use-toast";

// Socket.IO configuration
const SOCKET_URL = 'https://gyaantree.com';
const SOCKET_PATH = '/travel/ws';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJQSTAwMDAyOSIsInVzZXJUeXBlIjoiYWdlbnQiLCJjcmVhdGVkQXQiOiIyMDIxLTEyLTA2VDEwOjIyOjM3LjQ2OFoiLCJpYXQiOjE2Mzg3ODYxNTd9.IztGWLQQfx41ZJLvNUo02LmEhTrb3fkbtFW6h3quW7Q';

class SocketService {
  private socket: Socket | null = null;
  private eventListeners: Record<string, Array<(data: any) => void>> = {};
  private connectionStatus: 'disconnected' | 'connecting' | 'connected' = 'disconnected';
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(SOCKET_URL, {
      path: SOCKET_PATH,
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.MAX_RECONNECT_ATTEMPTS,
      reconnectionDelay: 1000,
      auth: {
        token: AUTH_TOKEN,
      },
      transports: ['websocket', 'polling'],
    });

    this.setupListeners();

    // Add a raw message logger for debugging
    this.socket.onAny((event, ...args) => {
      console.log(`⚡️ SOCKET RECEIVED EVENT: ${event}`, args);
    });
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Socket.IO connected ✅');
      this.connectionStatus = 'connected';
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Socket.IO disconnected ❌: ${reason}`);
      this.connectionStatus = 'disconnected';
      
      if (reason === 'io server disconnect') {
        // The server has forcefully disconnected
        this.reconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
      this.connectionStatus = 'disconnected';
      
      this.reconnectAttempts++;
      if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
        toast({
          title: "Connection Error",
          description: "Unable to connect to quote service. Please try again later.",
          variant: "destructive",
        });
      }
    });
  }

  public connect(): void {
    if (this.connectionStatus === 'disconnected' && this.socket) {
      console.log('Attempting to connect Socket.IO...');
      this.connectionStatus = 'connecting';
      this.socket.connect();
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    this.connectionStatus = 'disconnected';
  }

  private reconnect(): void {
    if (this.reconnectAttempts < this.MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++;
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.MAX_RECONNECT_ATTEMPTS})...`);
        this.connect();
      }, 1000 * this.reconnectAttempts);
    }
  }

  public emit<T>(event: string, data: T, callback?: (response: any) => void): void {
    if (!this.socket || this.connectionStatus !== 'connected') {
      console.log(`Socket not connected yet, attempting to connect before emitting ${event}`);
      this.connect();
      setTimeout(() => {
        if (this.socket && this.connectionStatus === 'connected') {
          console.log(`Emitting event: ${event}`, data);
          this.socket.emit(event, data, callback);
        } else {
          console.error(`Failed to emit event ${event}, socket not connected`);
        }
      }, 1000);
      return;
    }

    console.log(`Emitting event: ${event}`, data);
    this.socket.emit(event, data, callback);
  }

  public on<T>(event: string, callback: (data: T) => void): () => void {
    console.log(`Registering listener for event: ${event}`);
    
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(callback);

    if (this.socket) {
      this.socket.on(event, (data) => {
        console.log(`Received event: ${event}`, data);
        callback(data);
      });
    }

    // Return function to remove listener
    return () => this.off(event, callback);
  }

  public off<T>(event: string, callback: (data: T) => void): void {
    if (this.socket) {
      this.socket.off(event, callback);
    }

    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(
        (cb) => cb !== callback
      );
    }
  }

  public getConnectionStatus(): string {
    return this.connectionStatus;
  }

  public isConnected(): boolean {
    return this.connectionStatus === 'connected';
  }
}

// Export a singleton instance
export const socketService = new SocketService();
