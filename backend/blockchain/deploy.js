require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');

const provider = new Web3.providers.HttpProvider(process.env.INFURA_URL);
const web3 = new Web3(provider);
const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

// Load ABI and Bytecode
const contractABI = JSON.parse(fs.readFileSync('./backend/blockchain/contractABI.json', 'utf8'));
const bytecode = '0x' + JSON.parse(fs.readFileSync('./backend/blockchain/compileOutput.json', 'utf8')).contracts['ActivityLogger.sol'].ActivityLogger.evm.bytecode.object;

(async () => {
    console.log('Deploying contract...');
    const contract = new web3.eth.Contract(contractABI);
    const deployedContract = await contract.deploy({ data: bytecode }).send({
        from: account.address,
        gas: 3000000
    });

    console.log('Contract deployed at:', deployedContract.options.address);
    fs.writeFileSync('./backend/blockchain/contractAddress.txt', deployedContract.options.address);
})();
