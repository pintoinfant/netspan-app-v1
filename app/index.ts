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
const port = 3000;

// Initialize your Ethereum provider (e.g., Infura)
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('tcr')

const tokenContractAddress = '0xA388d56F953Eb6D61eee909692E382D6401Ccb44';
const tcrContractAddress = '0x7048802ad7CE3F52035dE87a4Fe85fA1c6632902';
const timeLockContractAddress = '0xfdDCbc3Bb1E96f8a970dF64C09393179FD50ab73';
const governorContractAddress = '0xAE7D442940BE4D830ec02fe4007E3DE9F24AFED3';

// Connect to the contract
const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI.abi, provider);
const tcrContract = new ethers.Contract(tcrContractAddress, tcrContractABI.abi, provider);
const timeLockContract = new ethers.Contract(timeLockContractAddress, timeLockContractABI.abi, provider);
const governorContract = new ethers.Contract(governorContractAddress, governorContractABI.abi, provider);

// Define the event to listen for
// const eventName = 'Transfer'; // Replace with the actual event name

// Start listening to the event
tokenContract.on('*', (event) => {
  // console.log('Event emitted:');
  db.collection('events').insertOne(event)
  console.log(event); // Log the event data
});

tcrContract.on('*', (event) => {
  // console.log('Event emitted:');
  db.collection('events').insertOne(event)
  console.log(event); // Log the event data
});

timeLockContract.on('*', (event) => {
  // console.log('Event emitted:');
  db.collection('events').insertOne(event)
  console.log(event); // Log the event data
});

governorContract.on('*', (event) => {
  // console.log('Event emitted:');
  db.collection('events').insertOne(event)
  console.log(event); // Log the event data
});

// Start the Express.js server
app.listen(port, () => {
  client.connect().then(() => {
    console.log("Connected successfully to server");
  });
  console.log(`Express server listening on port ${port}`);
});
