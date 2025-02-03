const http = require('http');
const socketIo = require('socket.io');
const app = require('./app'); // Import the configured Express app
const { setupCollaborationServer } = require('./controllers/collaborationController');

const server = http.createServer(app);
const io = socketIo(server);

// Start WebSocket collaboration
setupCollaborationServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
