import { ethers, network } from "hardhat"

export async function addMembers() {
  const tokenContract = await ethers.getContract("TCRToken")
  const memberTx = await tokenContract.addNewDAOMember(
    '0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199',
    1000
  )
  await memberTx.wait(1)
  
  console.log(`Member added`)
}


addMembers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
