
import { Server } from "socket.io";
//@ts-ignore
import { Contract, ethers } from "ethers"
import contractABI from "../artifacts/contracts/TCRToken.sol/TCRToken.json"

const io = new Server();
// const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
const ABI = contractABI;

const provider = new ethers.providers.JsonRpcBatchProvider('http://localhost:8545');
let contract = new ethers.Contract('0x5FbDB2315678afecb367f032d93F642f64180aa3', ABI.abi, provider);

while (true) {

  contract.provider.on('NewDAOMember', (member: any) => {
    console.log(member);
  })

  contract.once('NewDAOMember', (member: any) => {
    console.log(member);
  })

  contract.on('NewDAOMember', (member: any) => {
    console.log(member);
  })
}