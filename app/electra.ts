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
const provider = new ethers.providers.JsonRpcProvider('https://althea.zone:8545');
// const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai-bor.publicnode.com');


const client = new MongoClient(process.env.MONGO_URI as string);
const db = client.db('electra')


const electraTokenAddress = "0x211B1fCEf17F8B5a02Df4bE392A07603A6C83469"
const governorContractAddress = "0x155b38a3D15F21497bc050Db6093F7bc539f1458"
const StationRegistryAddress = "0xEBC1bAb4403E8F8f170781F7d4817039031eE675"
const VehicleLedgerAddress = "0x51255104075Ff8c8B9c1Dece4d44b922FA7A27C7"

// Connect to the contract
const tokenContract = new ethers.Contract(electraTokenAddress, electraTokenABI.abi, provider);
const governorContract = new ethers.Contract(governorContractAddress, governorContractABI.abi, provider);
const StationRegistryContract = new ethers.Contract(StationRegistryAddress, StationRegistryABI.abi, provider);
const VehicleLedgerContract = new ethers.Contract(VehicleLedgerAddress, VehicleLedgerABI.abi, provider);


// Start listening to the event

tokenContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('electra-events').insertOne({ ...event, chainId: 417834 })
});

governorContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('electra-events').insertOne({ ...event, chainId: 417834 })
});

StationRegistryContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('electra-events').insertOne({ ...event, chainId: 417834 })
});

VehicleLedgerContract.on('*', async (event) => {
  // console.log('Event emitted:');
  console.log(event); // Log the event data
  await db.collection('electra-events').insertOne({ ...event, chainId: 417834 })
});

// Start the Express.js server
app.listen(port, () => {
  client.connect().then(() => {
    console.log("Connected successfully to server");
  });
  console.log(`Express server listening on port ${port}`);
});
