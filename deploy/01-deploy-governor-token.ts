import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployGovernanceToken: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer, alpha, beta, charlie, delta, echo } = await getNamedAccounts();
  log("----------------------------------------------------")
  log("Deploying GovernanceToken and waiting for confirmations...")
  const governanceToken = await deploy("NetSpanToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
  })
  log(`GovernanceToken at ${governanceToken.address}`)

  log("----------------------------------------------------")
  log('Minting 5000 TCRToken to deployer...')
  const mintTx = await ethers.getContractAt('NetSpanToken', governanceToken.address)
  mintTx.addNewDAOMember(deployer, 5000)
  log('Minted 5000 TCRToken to deployer...')

  log('Minting 1000 TCRToken to alpha...')
  mintTx.addNewDAOMember(alpha, 1000)
  log('Minted 1000 TCRToken to alpha...')

  log('Minting 500 TCRToken to beta...')
  mintTx.addNewDAOMember(beta, 500)
  log('Minted 500 TCRToken to beta...')

  await mintTx.deployed()

  const totalSupply = await mintTx.totalSupply()
  log(`Total Supply: ${totalSupply}`)
  // if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
  //   await verify(governanceToken.address, [])
  // }
  // log(`Delegating to ${deployer}`)
  // await delegate(governanceToken.address, deployer)
  // log("Delegated!")
}

// const delegate = async (governanceTokenAddress: string, delegatedAccount: string) => {
//   const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress)
//   const transactionResponse = await governanceToken.delegate(delegatedAccount)
//   await transactionResponse.wait(1)
//   console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`)
// }

export default deployGovernanceToken
deployGovernanceToken.tags = ["all", "governor"]
