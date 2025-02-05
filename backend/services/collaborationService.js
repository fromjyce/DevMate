const { logActivity } = require('../blockchain/blockchain');

async function handleCodeEdit(data) {
    // Process the edit (update database, etc.)
    console.log('Processing edit:', data);

    // Log the activity in blockchain
    await logActivity(data.userId, 'code_edit', Date.now());
}

module.exports = { handleCodeEdit };
