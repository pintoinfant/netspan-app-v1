// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import OpenZeppelin ERC20 and Ownable for token and contract ownership management
import "@openzeppelin/contracts/access/Ownable.sol";

contract PLMN is Ownable {
  // Struct to represent a PLMN entry
  struct Entry {
    address proposer;
    string name;
    string region;
    bool challenged;
    bool approved;
  }

  // Mapping from PLMN identifier to PLMN entry
  mapping(uint256 => Entry) public plmnRegistry;

  // DAO contract responsible for governance decisions
  address public daoContract;

  event NewEntry(uint256 indexed plmn, address indexed proposer, string name, string region);

  constructor(address _daoContract) {
    daoContract = _daoContract;
  }

  // Propose a new PLMN entry
  function createEntry(
    uint256 plmn,
    string memory name,
    string memory region
  ) public onlyOwner {
    plmnRegistry[plmn] = Entry({
      proposer: msg.sender,
      name: name,
      region: region,
      challenged: false,
      approved: false
    });

    emit NewEntry(plmn, msg.sender, name, region);
  }
}
