import express from 'express';
import { ethers } from 'ethers';
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

import tokenContractABI from "../artifacts/contracts/NetSpanToken.sol/NetSpanToken.json"
import tcrContractABI from "../artifacts/contracts/TCR.sol/TCR.json"
import timeLockContractABI from "../artifacts/contracts/governance_standard/TimeLock.sol/TimeLock.json"
import governorContractABI from "../artifacts/contracts/governance_standard/GovernorContract.sol/NetSpanGovernor.json"

const app = express();
const port = 3001;

// Initialize your Ethereum provider (e.g., Infura)
// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');


const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('netspan')

const tokenContractAddress = '0xb3473DDC4449D30CC09fEFC4AF31eC69C9313d1d';
const tcrContractAddress = '0xf7d359d38b2D5a986Ee3b5eAB7c1166555E45112';
const timeLockContractAddress = '0x7a87F9B540Af7d09Fcb5cb1f4f6f0AbA1C963302';
const governorContractAddress = '0x0a27f6a8791460fa9D28dDD8B4E2b4217959d5FD';

// const tokenContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
// const tcrContractAddress = '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318';
// const timeLockContractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
// const governorContractAddress = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';

// Connect to the contract
const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI.abi, provider);
const tcrContract = new ethers.Contract(tcrContractAddress, tcrContractABI.abi, provider);
const timeLockContract = new ethers.Contract(timeLockContractAddress, timeLockContractABI.abi, provider);
const governorContract = new ethers.Contract(governorContractAddress, governorContractABI.abi, provider);

// Define the event to listen for
// const eventName = 'Transfer'; // Replace with the actual event name

// Start listening to the event
tokenContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 80001 })
});

tcrContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 80001 })
});

timeLockContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 80001 })
});

governorContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 80001 })
});

// Start the Express.js server
app.listen(port, () => {
  client.connect().then(() => {
    console.log("Connected successfully to server");
  });
  console.log(`Express server listening on port ${port}`);
});
