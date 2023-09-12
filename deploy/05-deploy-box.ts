import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import verify from "../helper-functions"
import { networkConfig, developmentChains } from "../helper-hardhat-config"
import { ethers } from "hardhat"

const deployRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // @ts-ignore
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const governorContract = await get("NetSpanGovernor")
  log("----------------------------------------------------")
  log("Deploying TCR Registry and waiting for confirmations...")

  const tcrRegistry = await deploy("TCR", {
    from: deployer,
    args: [governorContract.address],
    log: true,
  })


  log(`TCR Registry at ${tcrRegistry.address}`)
  const tcrRegistryContract = await ethers.getContractAt("TCR", tcrRegistry.address)
  const timeLock = await ethers.getContract("TimeLock")
  const transferTx = await tcrRegistryContract.transferOwnership(timeLock.address)
  await transferTx.wait(1)
  log(`Ownership of TCR Registry transferred from ${tcrRegistry.address} to TimeLock at ${timeLock.address}`)
}

export default deployRegistry
deployRegistry.tags = ["all", "box"]
