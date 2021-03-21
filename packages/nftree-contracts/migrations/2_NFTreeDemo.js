require('dotenv').config();

const NFTree = artifacts.require('NFTreeDemo');

module.exports = (deployer) => {
  deployer.deploy(NFTree);
};
