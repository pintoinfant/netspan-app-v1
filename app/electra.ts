import express from 'express';
import { ethers } from 'ethers';
import { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()

import electraTokenABI from "./electra-abis/ElectraToken.json"
import governorContractABI from "./electra-abis/GovernorContract.json"
import StationRegistryABI from "./electra-abis/StationRegistry.json"
import VehicleLedgerABI from "./electra-abis/VehicleLedger.json"

const app = express();
const port = 3000;

// Initialize your Ethereum provider (e.g., Infura)
// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');


const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('electra')


const electraTokenAddress = "0x1C6686e806873786439E3C36A8740B99A9028eB4"
const governorContractAddress = "0xeD5c0474f76f5F68Fa1c4BE284e2Dc2A263fB990"
const StationRegistryAddress = "0x98e0E4d8ba9A783A7Dd725C9270bDD857523DeCa"
const VehicleLedgerAddress = "0x38770155e8598214F46144C154d62eC21474ee36"

// Connect to the contract
const tokenContract = new ethers.Contract(electraTokenAddress, electraTokenABI.abi, provider);
const governorContract = new ethers.Contract(governorContractAddress, governorContractABI.abi, provider);
const StationRegistryContract = new ethers.Contract(StationRegistryAddress, StationRegistryABI.abi, provider);
const VehicleLedgerContract = new ethers.Contract(VehicleLedgerAddress, VehicleLedgerABI.abi, provider);


// Start listening to the event

tokenContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('electra-events').insertOne({ ...event, chainId: 80001 })
});

governorContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 80001 })
});

StationRegistryContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('tcr-registry').insertOne({ ...event, chainId: 80001 })
});

VehicleLedgerContract.on('*', async (event) => {
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
