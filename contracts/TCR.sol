// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin ERC20 and Ownable for token and contract ownership management
import "@openzeppelin/contracts/access/Ownable.sol";

contract TCR is Ownable {
  // Struct to represent a PLMN entry
  struct Entry {
    string plmn;
    address proposer;
    string provider;
    string region;
  }

  // Mapping from PLMN identifier to PLMN entry
  mapping(string => Entry) public plmnRegistry;

  // DAO contract responsible for governance decisions
  address public daoContract;

  event NewEntry(string plmn, address indexed proposer, string provider, string region);
  event EntryDeleted(string plmn, address indexed deleter);

  constructor(address _daoContract) {
    daoContract = _daoContract;
  }

  // Propose a new PLMN entry
  function createEntry(
    string memory plmn,
    string memory provider,
    string memory region
  ) public onlyOwner {
    plmnRegistry[plmn] = Entry({
      plmn: plmn,
      proposer: msg.sender,
      provider: provider,
      region: region
    });

    emit NewEntry(plmn, msg.sender, provider, region);
  }

  // Delete a PLMN entry
  function deleteEntry(string memory plmn) public onlyOwner {
    delete plmnRegistry[plmn];
    emit EntryDeleted(plmn, msg.sender);
  }
}
