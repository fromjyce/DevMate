const { logActivity } = require('../blockchain/blockchain');

function setupCollaborationServer(server) {
    const io = require('socket.io')(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle code edit events
        socket.on('edit', async (data) => {
            console.log('Code edited:', data);

            // Broadcast to other users
            socket.broadcast.emit('codeEdited', data);

            // Log the activity in blockchain
            await logActivity(data.userId, 'edit', Date.now());
        });

        // Handle cursor position updates
        socket.on('cursorPosition', (data) => {
            console.log('Cursor moved:', data);
            socket.broadcast.emit('cursorPosition', data);
        });

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = { setupCollaborationServer };
