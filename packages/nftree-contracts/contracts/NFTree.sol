// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "@charged-particles/universe/contracts/interfaces/IChargedParticles.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTree is ERC721 {
  using Counters for Counters.Counter;

  event PlantSeed(
    uint256 tokenId,
    address owner,
    string walletManagerId,
    address assetToken,
    uint256 assetAmount
  );

  event ChopTree(
    uint256 tokenId,
    address owner,
    string walletManagerId,
    address assetToken,
    uint256 assetAmount
  );

  struct Tree {
    string walletManagerId;
    address assetToken;
    uint256 assetAmount;
    bool isChopped;
  }

  Counters.Counter private _idCounter;
  mapping (uint256 => Tree) _trees;
  IChargedParticles private _CP;

  constructor(address chargedParticlesAddress)
    public
    ERC721("NFTree", "NFTREE")
  {
    _CP = IChargedParticles(chargedParticlesAddress);
  }

  function isChopped(uint256 tokenId)
    external
    view
    returns (bool)
  {
    return _trees[tokenId].isChopped;
  }

  function plantSeed(string calldata walletManagerId, address assetToken, uint256 assetAmount)
    external
    returns (uint256)
  {
    address sender = _msgSender();

    _idCounter.increment();
    uint256 tokenId = _idCounter.current();
    _trees[tokenId] = Tree(walletManagerId, assetToken, assetAmount, false);
    _safeMint(sender, tokenId);

    IERC20(assetToken).approve(address(_CP), assetAmount);
    _CP.energizeParticle(
      address(this),
      tokenId,
      walletManagerId,
      assetToken,
      assetAmount,
      address(0x0)
    );

    PlantSeed(tokenId, sender, walletManagerId, assetToken, assetAmount);
    return tokenId;
  }

  function chopTree(uint256 tokenId)
    external
  {
    address payable owner = _msgSender();
    require(
      _isApprovedOrOwner(owner, tokenId),
      "NFTree: caller is not owner nor approved"
    );

    Tree memory tree = _trees[tokenId];
    require(
      !tree.isChopped,
      "NFTree: tree is already chopped"
    );

    _trees[tokenId].isChopped = true;    
    _CP.dischargeParticle(
      owner,
      address(this),
      tokenId,
      tree.walletManagerId,
      tree.assetToken
    );
    _burn(tokenId);

    ChopTree(tokenId, owner, tree.walletManagerId, tree.assetToken, tree.assetAmount);
  }
}
