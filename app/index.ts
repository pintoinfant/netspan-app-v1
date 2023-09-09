import express from 'express';
import { ethers } from 'ethers';
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

import tokenContractABI from "../artifacts/contracts/TCRToken.sol/TCRToken.json"

const app = express();
const port = 3000;

// Initialize your Ethereum provider (e.g., Infura)
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');

const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('tcr')

const tokenContractAddress = '0x2c8CEc9B25DbFEAC623b42CbAb268A4409Fe73E1';

// Connect to the contract
const tokenContract = new ethers.Contract(tokenContractAddress, tokenContractABI.abi, provider);

// Define the event to listen for
// const eventName = 'Transfer'; // Replace with the actual event name

// Start listening to the event
tokenContract.on('*', (event) => {
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