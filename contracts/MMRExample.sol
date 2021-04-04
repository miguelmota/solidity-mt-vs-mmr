//SPDX-License-Identifier: Unlicense
pragma solidity >0.5.0 <0.8.0;


import "./MMR.sol";

contract MMRExample {
  using MMR for MMR.Tree;
  MMR.Tree mmr;

  bytes32 public rootHash;
  bool public verified;

  function append(bytes32 hash) external {
    mmr.append(hash);
  }

  function commit() external {
    rootHash = mmr.root;
  }

  function verify(
      bytes32 root,
      uint256 width,
      uint256 index,
      bytes32 value,
      bytes32[] memory peaks,
      bytes32[] memory siblings
  ) external {
    verified = MMR.inclusionProof(
        root,
        width,
        index,
        value,
        peaks,
        siblings
    );
  }

  function getMerkleProof(uint256 index) public view returns (
      bytes32 root,
      uint256 width,
      bytes32[] memory peakBagging,
      bytes32[] memory siblings
  ){
    return mmr.getMerkleProof(index);
  }
}
