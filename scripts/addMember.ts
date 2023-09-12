import { ethers, network } from "hardhat"

export async function addMembers() {
  const tokenContract = await ethers.getContract("NetSpanToken")
  // const memberTx = await tokenContract.balanceOf(
  //   '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266')
  // // await memberTx.waitForDeployment(1)

  // console.log(`Member balance : ${memberTx}`)

  const memberTx = await tokenContract.addNewDAOMember(
    '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
    1000
  )
  await memberTx.wait(1)
  console.log(`Member added : ${memberTx}`)
}


addMembers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
