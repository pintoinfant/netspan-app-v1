
import { Server } from "socket.io";
//@ts-ignore
import { ethers } from "hardhat"

const io = new Server();
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

io.on("connection", (socket) => {
  console.log(`socket ${socket.id} connected`);

  socket.on("ProposalCreated", (data) => {
    console.log(`ProposalCreated: ${data}`);
  });

  // upon disconnection
  socket.on("disconnect", (reason) => {
    console.log(`socket ${socket.id} disconnected due to ${reason}`);
  });
});

io.listen(3000)