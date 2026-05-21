import { Server } from 'socket.io';
export declare const setSocketIO: (io: Server) => void;
export declare const emitToUser: (userId: string, event: string, payload: unknown) => void;
declare const _default: {
    setSocketIO: (io: Server) => void;
    emitToUser: (userId: string, event: string, payload: unknown) => void;
};
export default _default;
