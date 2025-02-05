const { logActivity } = require('../blockchain/blockchain');
const { addActivity } = require('../services/activityService');

/**
 * Logs user activity and stores it in both the database and blockchain.
 */
async function logUserActivity(req, res) {
    const { userId, action } = req.body;
    const timestamp = Date.now();

    try {
        // Log to blockchain
        const txHash = await logActivity(userId, action, timestamp);

        // Log to the database
        await addActivity(userId, action, timestamp, txHash);

        res.status(200).json({ message: 'Activity logged successfully', txHash });
    } catch (error) {
        console.error('Error logging activity:', error);
        res.status(500).json({ error: 'Failed to log activity' });
    }
}

module.exports = { logUserActivity };
