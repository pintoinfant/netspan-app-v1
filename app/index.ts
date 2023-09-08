import express from 'express';
import { ethers } from 'ethers';
import contractABI from "../artifacts/contracts/TCRToken.sol/TCRToken.json"

const app = express();
const port = 3000;

// Initialize your Ethereum provider (e.g., Infura)
const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';


// Connect to the contract
const contract = new ethers.Contract(contractAddress, contractABI.abi, provider);

// Define the event to listen for
const eventName = 'Transfer'; // Replace with the actual event name

// Start listening to the event
contract.on(eventName, (...args) => {
  console.log('Event emitted:');
  console.log(...args); // Log the event data
});

// Start the Express.js server
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});