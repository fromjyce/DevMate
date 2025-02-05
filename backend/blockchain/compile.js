const fs = require('fs');
const solc = require('solc');

const contractPath = './blockchain/contracts/ActivityLogger.sol';
const source = fs.readFileSync(contractPath, 'utf8');

const input = {
    language: 'Solidity',
    sources: {
        'ActivityLogger.sol': { content: source }
    },
    settings: {
        outputSelection: {
            '*': { '*': ['abi', 'evm.bytecode'] }
        }
    }
};

// Compile contract
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts['ActivityLogger.sol'].ActivityLogger;

// Save ABI
fs.writeFileSync('./blockchain/contractABI.json', JSON.stringify(contract.abi, null, 2));
console.log('ABI saved to contractABI.json');
