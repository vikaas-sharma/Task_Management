const socketIo = require('socket.io');

const initializeWebSocket = (server) => {
    const io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('taskUpdate', (task) => {
            io.emit('taskUpdate', task);  // Notify all clients of task updates
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = initializeWebSocket;
