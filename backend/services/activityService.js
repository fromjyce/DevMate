const activities = []; // Simulated in-memory storage, replace with a database if needed.

async function addActivity(userId, action, timestamp, txHash) {
    const activity = { userId, action, timestamp, txHash };
    activities.push(activity);
    console.log('Activity stored:', activity);
}

module.exports = { addActivity };
