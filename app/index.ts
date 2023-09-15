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
const provider = new ethers.providers.JsonRpcProvider('https://althea.zone:8545');


const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('netspan')


const tokenContractAddress = '0x2c8CEc9B25DbFEAC623b42CbAb268A4409Fe73E1';
const tcrContractAddress = '0x5736DcBA26013BBaA9D51C927d1BFC8Aa4C7a8DC';
const timeLockContractAddress = '0xa9D91ad719B84c1483f2e756b91cb6a5d9B67C0f';
const governorContractAddress = '0x617c758C2c9F8f335Cb88c3BB5aF41bB385e3C8F';


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
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 417834 })
});

tcrContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 417834 })
});

timeLockContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 417834 })
});

governorContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 417834 })
});

// Start the Express.js server
app.listen(port, () => {
  client.connect().then(() => {
    console.log("Connected successfully to server");
  });
  console.log(`Express server listening on port ${port}`);
});
