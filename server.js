// server.js
const http = require('http');
const app = require('./app');
const initializeWebSocket = require('./utils/websocket');

const PORT = process.env.PORT || 5000;

// Create server
const server = http.createServer(app);

// Initialize WebSocket
initializeWebSocket(server);

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
