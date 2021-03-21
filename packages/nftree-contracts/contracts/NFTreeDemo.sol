// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTreeDemo is ERC721 {
  using Counters for Counters.Counter;

  event PlantSeed(uint256 tokenId, address owner);
  event WaterTree(uint256 tokenId);
  event ChopTree(uint256 tokenId);

  Counters.Counter private _idCounter;
  mapping (uint256 => bool) _choppedMap;

  constructor() public ERC721("NFTree", "NFTREE") {}

  function isChopped(uint256 tokenId)
    external
    view
    returns (bool)
  {
    return _choppedMap[tokenId];
  }

  function plantSeed()
    external
    returns (uint256)
  {
    address owner = _msgSender();
    _idCounter.increment();
    uint256 tokenId = _idCounter.current();
    _safeMint(owner, tokenId);
    PlantSeed(tokenId, owner);
    return tokenId;
  }

  function waterTree(uint256 tokenId)
    external
  {
    WaterTree(tokenId);
  }

  function chopTree(uint256 tokenId)
    external
  {
    address payable owner = _msgSender();
    require(
      _isApprovedOrOwner(owner, tokenId),
      "NFTree: caller is not owner nor approved"
    );

    require(
      !_choppedMap[tokenId],
      "NFTree: tree is already chopped"
    );

    _choppedMap[tokenId] = true;
    ChopTree(tokenId);
  }
}
