/* eslint-disable no-console */

require('dotenv').config();

const NFTree = artifacts.require('NFTree');
const IERC20 = artifacts.require('IERC20');

const INVESTMENT = 100;

module.exports = async (done) => {
  try {
    const nftree = await NFTree.deployed();
    const dai = await IERC20.at(process.env.DAI_ADDRESS);
  
    await dai.approve(NFTree.address, INVESTMENT);
    const tx = await nftree.plantSeed(
      'aave',
      process.env.DAI_ADDRESS,
      INVESTMENT,
    );
    console.log('\nTRANSACTION RESULT:\n');
    console.dir(tx);
    console.log('\n\nEVENT LOGS:\n');
    tx.logs.forEach(({ event, args }) => {
      console.log(`\n${event}:`);
      console.dir(args);
    });
  } catch (err) {
    console.err(err);
  }
  done();
};
