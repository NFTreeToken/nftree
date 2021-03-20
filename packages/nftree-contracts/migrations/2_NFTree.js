require('dotenv').config();

const NFTree = artifacts.require('NFTree');

module.exports = (deployer) => {
  deployer.deploy(NFTree, process.env.CHARGED_PARTICLES_ADDRESS);
};
