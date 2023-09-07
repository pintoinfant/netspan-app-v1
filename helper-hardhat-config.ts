import { ethers } from "hardhat"

export interface networkConfigItem {
  ethUsdPriceFeed?: string
  blockConfirmations?: number
}

export interface networkConfigInfo {
  [key: string]: networkConfigItem
}

export const networkConfig: networkConfigInfo = {
  localhost: {},
  hardhat: {},
  sepolia: {
    blockConfirmations: 6,
  },
}

export const developmentChains = ["hardhat", "localhost"]
export const proposalsFile = "proposals.json"

// Governor Values
export const QUORUM_PERCENTAGE = 4 // Need 4% of voters to pass
export const MIN_DELAY = 3600 // 1 hour - after a vote passes, you have 1 hour before you can enact
// export const VOTING_PERIOD = 45818 // 1 week - how long the vote lasts. This is pretty long even for local tests
export const VOTING_PERIOD = 5 // blocks
export const VOTING_DELAY = 1 // 1 Block - How many blocks till a proposal vote becomes active
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000"

export const PLMN = 9046//ethers.utils.ParamType.from({ name: "plmn", type: "uint256"})
export const REGION = 'TN' //ethers.utils.ParamType.from({ name: "region", type: "string" })
export const NAME = 'Jio' //ethers.utils.ParamType.from({ name: "name", type: "string" })
export const FUNC = "createEntry"
export const PROPOSAL_DESCRIPTION = `Proposal to allocate ${PLMN} MNC code to ${NAME} in ${REGION} region.`
