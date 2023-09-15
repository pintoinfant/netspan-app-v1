// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin ERC20 and Ownable for token and contract ownership management
import "@openzeppelin/contracts/access/Ownable.sol";

contract TCR is Ownable {
  // Struct to represent a PLMN entry
  struct Entry {
    uint256 mcc;
    uint256 mnc;
    address proposer;
    string provider;
    string region;
  }

  // Mapping from PLMN identifier to PLMN entry
  mapping(uint256 => Entry) public plmnRegistry;

  // DAO contract responsible for governance decisions
  address public daoContract;

  event NewEntry(
    uint256 indexed mcc,
    uint256 indexed mnc,
    address indexed proposer,
    string provider,
    string region
  );
  event EntryDeleted(uint256 indexed mnc, address indexed deleter);

  constructor(address _daoContract) {
    daoContract = _daoContract;
  }

  // Propose a new PLMN entry
  function createEntry(
    uint256 mcc,
    uint256 mnc,
    string memory provider,
    string memory region
  ) public onlyOwner {
    plmnRegistry[mnc] = Entry({
      mcc: mcc,
      mnc: mnc,
      proposer: msg.sender,
      provider: provider,
      region: region
    });

    emit NewEntry(mcc, mnc, msg.sender, provider, region);
  }

  // Delete a PLMN entry
  function deleteEntry(uint256 mnc) public onlyOwner {
    delete plmnRegistry[mnc];
    emit EntryDeleted(mnc, msg.sender);
  }
}
