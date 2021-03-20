/* eslint-disable no-console */

require('dotenv').config();

const NFTree = artifacts.require('NFTree');

module.exports = async (done) => {
  const nftree = await NFTree.deployed();
  const tx = await nftree.plantSeed(
    'aave',
    process.env.DAI_ADDRESS,
    1,
  );
  console.log('\nTRANSACTION RESULT:\n');
  console.dir(tx);
  console.log('\n\nEVENT LOGS:\n');
  tx.logs.forEach(({ event, args }) => {
    console.log(`\n${event}:`);
    console.dir(args);
  });
  done();
};
