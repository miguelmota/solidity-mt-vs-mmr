//SPDX-License-Identifier: Unlicense
pragma solidity >0.5.0 <0.8.0;


import "./MerkleTree.sol";

contract MTExample {
  bytes32 public rootHash;
  bool public verified;
  bytes32[] public items;

  function append(bytes32 hash) external {
    items.push(hash);
  }

  function commit() external {
    rootHash = MerkleTree.getMerkleRoot(items);
  }

  function verify(
      bytes32 _root,
      bytes32 _leaf,
      uint256 _index,
      bytes32[] memory _siblings,
      uint256 _totalLeaves
  )
      external
  {
    verified = MerkleTree.verify(_root, _leaf, _index, _siblings, _totalLeaves);
  }
}
