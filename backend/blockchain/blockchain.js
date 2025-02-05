const Web3 = require('web3');
const config = require('./config');
const contractABI = require('./contractABI.json'); // Smart contract ABI

const web3 = new Web3(config.network);
const contract = new web3.eth.Contract(contractABI, config.contractAddress);
const account = web3.eth.accounts.privateKeyToAccount(config.privateKey);
web3.eth.accounts.wallet.add(account);

/**
 * Logs user activity to the blockchain.
 * @param {string} userId - ID of the user.
 * @param {string} action - User action (e.g., "edit", "login").
 * @param {number} timestamp - Unix timestamp of the action.
 */
async function logActivity(userId, action, timestamp) {
    try {
        const tx = await contract.methods.recordActivity(userId, action, timestamp)
            .send({ from: account.address, gas: 300000 });

        console.log('Activity logged on blockchain:', tx.transactionHash);
        return tx.transactionHash;
    } catch (error) {
        console.error('Blockchain logging failed:', error);
    }
}

module.exports = { logActivity };
