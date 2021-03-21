/* eslint-disable no-mixed-operators */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import * as _ from 'lodash';
import * as P5 from 'p5';
import React, { useRef } from 'react';
import Sketch from 'react-p5';

import { ETH_PRICE_DATA } from '../../data/prices';
import tokenSVG_aETH from '../../images/token-pngs/aETH.png';
import tokenPNG_aETH from '../../images/token-svgs/aETH.svg';
import { getTokenPriceData } from '../../utils/covalent';
import { getPricingData } from '../../utils/thegraph';

const SELECTED_TOKEN = 'WBTC';

getTokenPriceData('WBTC', '2020-01-01', '2020-02-15');

// fetch data from thegraph
// (async function go() {
//   const prices = await getPricingData(SELECTED_TOKEN, '2020-09-01', '2020-10-20');
//   console.log(prices);
// })();

const START_DATE_ISO = '2020-12-10';
const END_DATE_ISO = '2021-02-15';

const priceData = _.filter(ETH_PRICE_DATA, (item) => (item.date > START_DATE_ISO && item.date <= END_DATE_ISO));
console.log(priceData);

const noiseZ = 0;

/*
Create your Custom style to be turned into a EthBlock.art Mother NFT

Basic rules:
 - use a minimum of 1 and a maximum of 4 "modifiers", modifiers are values between 0 and 1,
 - use a minimum of 1 and a maximum of 3 colors, the color "background" will be set at the canvas root
 - Use the block as source of entropy, no Math.random() allowed!
 - You can use a "shuffle bag" using data from the block as seed, a MersenneTwister library is provided

 Arguments:
  - block: the blockData, in this example template you are given 3 different blocks to experiment with variations, check App.js to learn more
  - mod[1-3]: template modifier arguments with arbitrary defaults to get your started
  - color: template color argument with arbitrary default to get you started

Getting started:
 - Write p5.js code, comsuming the block data and modifier arguments,
   make it cool and use no random() internally, component must be pure, output deterministic
 - Customize the list of arguments as you wish, given the rules listed below
 - Provide a set of initial /default values for the implemented arguments, your preset.
 - Think about easter eggs / rare attributes, display something different every 100 blocks? display something unique with 1% chance?

 - check out p5.js documentation for examples!
*/

const DEFAULT_SIZE = 1000;

const SEED = Math.random();

const TREE_SPECIES_CONFIG = {
  ETH: {
    leafColor: '#0D1C10',
    trunkColor: '#1A120D',
  },
  BTC: {
    leafColor: '#FF9416',
    trunkColor: '#344246',
  },
};

const ForestRenderer = ({
  // canvasRef,
  // attributesRef,
  backgroundColor = '#222',
  forestMode = false,
}) => {
  const TOKEN_LOGOS: Record<string, P5.Image> = {};

  let canvas: P5.Renderer;

  const WIDTH = forestMode ? 3 * DEFAULT_SIZE : DEFAULT_SIZE;
  const HEIGHT = DEFAULT_SIZE;

  // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
  const setup = (p5: P5, canvasParentRef) => {
    console.log('called setup');
    console.log(canvasParentRef);

    // Keep reference of canvas element for snapshots
    canvas = p5.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    p5.pixelDensity(p5.displayDensity());
    canvas.style('width', '100%');
    canvas.style('height', '100%');

    // if (canvasRef) {
    //   canvasRef.current = canvas;
    // }

    // p5.noLoop();
    // setInterval(() => draw(p5), 1000);

    // TOKEN_LOGOS.aETH = p5.loadImage(tokenSVG_aETH);
    TOKEN_LOGOS.aETH = p5.loadImage(tokenPNG_aETH);
    // console.log(TOKEN_LOGOS.aETH);

    // attributesRef.current = () => ({
    //   // This is called when the final image is generated, when creator opens the Mint NFT modal.
    //   // should return an object structured following opensea/enjin metadata spec for attributes/properties
    //   // https://docs.opensea.io/docs/metadata-standards
    //   // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

    //   attributes: [
    //     {
    //       display_type: 'number',
    //       trait_type: 'your trait here number',
    //       value: hoistedValue.current, // using the hoisted value from within the draw() method, stored in the ref.
    //     },

    //     {
    //       trait_type: 'your trait here text',
    //       value: 'replace me',
    //     },
    //   ],
    // });
  };

  // draw() is called right after setup and in a loop
  // disabling the loop prevents controls from working correctly
  // code must be deterministic so every loop instance results in the same output

  const draw = (p5: P5) => {
    // p5.noLoop(); //

    p5.randomSeed(SEED);
    p5.noiseSeed(SEED);

    console.log(`setting seed to ${SEED}`);

    // if (drawn) return;
    // drawn = true;

    const GROUND_Y = HEIGHT * 1;

    // p5.clear and p5.background dont seem to work properly
    // due to bugs around screen pixel density...
    // so we just paint over the whole canvas instead
    (p5 as any).erase(255);
    p5.rect(0, 0, WIDTH, HEIGHT);
    (p5 as any).noErase();

    const XCENTER = WIDTH / 2;
    const YCENTER = HEIGHT / 2;

    // show framerate
    const fps = p5.frameRate();
    p5.fill(100);
    p5.color('#FFF');
    p5.textSize(50);
    p5.text(`FPS: ${fps.toFixed(0)}`, 10, 100);

    // since the drawing is actually in a loop, we need to set a seed or it changes on each render

    // the seeds will need to be set based on block data to keep things deterministic
    // but better for now to see many variations while we work, so we use a single seed per reload

    // p5.randomSeed(parseInt(`0x${blockHash.substr(2, 14)}`, 16));
    // p5.noiseSeed(parseInt(`0x${blockHash.substr(16, 14)}`, 16));

    const treeCanvas = p5.createGraphics(WIDTH, HEIGHT);
    treeCanvas.translate(XCENTER, YCENTER);
    treeCanvas.noFill();

    if (forestMode) {
      drawNFTree(500, 200, 'BTC');
      drawNFTree(600, 400, 'ETH');
      drawNFTree(900, 800, 'BTC');
      drawNFTree(1200, 100, 'ETH');
      drawNFTree(1500, 10, 'ETH');
      drawNFTree(1600, 50, 'ETH');
      drawNFTree(1900, 600, 'BTC');
      drawNFTree(2500, 300, 'BTC');
    } else {
      drawNFTree(WIDTH / 2, 500, 'BTC');
    }

    function drawNFTree(xPosition, height, tokenSymbol) {
      const startingBranchWeight = Math.max(3, height * 0.1);
      const startingBranchHeight = Math.max(30, height * 0.5);
      const speciesConfig = TREE_SPECIES_CONFIG[tokenSymbol];
      branch(speciesConfig, xPosition, GROUND_Y, p5.radians(-90), startingBranchHeight, startingBranchWeight, 10);
    }

    function branch(
      speciesConfig,
      startX, startY, branchAngle, branchLength, branchWeight, twigSteps,
      branchDepth = 0,
    ) {
      let twigStartX = startX;
      let twigStartY = startY;
      const twigLength = branchLength / twigSteps;
      const branchEndWeight = branchWeight * 0.4;

      for (let i = 0; i < twigSteps; i++) {
        const twigRandAngle = p5.random(-p5.PI, p5.PI) * 0.05;
        const twigRandLength = p5.random(0.5, 1.5);
        const twigEndX = twigStartX + p5.cos(branchAngle + twigRandAngle) * (twigLength * twigRandLength);
        const twigEndY = twigStartY + p5.sin(branchAngle + twigRandAngle) * (twigLength * twigRandLength);
        const twigWeight = p5.map(i, 0, twigSteps, branchWeight, branchEndWeight);

        drawTwig(speciesConfig, twigStartX, twigStartY, twigEndX, twigEndY, twigWeight, branchDepth);

        twigStartX = twigEndX;
        twigStartY = twigEndY;
      }

      // Create sub branches
      if (branchWeight > 1) {
        const branchNum = Math.trunc(p5.random(2, 8));

        for (let i = 0; i < branchNum; i++) {
          const newBranchX = twigStartX;
          const newBranchY = twigStartY;
          const newBranchAngle = branchAngle + p5.random(-p5.PI / 3, p5.PI / 3);
          const newBranchLength = branchLength * 0.6;
          const newBranchWeight = branchEndWeight;
          const newTwigSteps = Math.trunc(twigSteps * 0.9);

          branch(speciesConfig, newBranchX, newBranchY, newBranchAngle, newBranchLength, newBranchWeight, newTwigSteps, branchDepth + 1);
        }
      }
    }

    function drawTwig(
      speciesConfig,
      twigStartX, twigStartY, twigEndX, twigEndY, twigWeight, branchDepth,
    ) {
      // p5.push();

      // color leaves differently
      if (twigWeight < 0.7) {
        p5.stroke(speciesConfig.leafColor);
      } else {
        p5.stroke(speciesConfig.trunkColor);
      }

      // make first piece (trunk) a little thicker
      p5.strokeWeight(twigWeight * (branchDepth === 0 ? 0.7 : 0.4));
      p5.line(twigStartX, twigStartY, twigEndX, twigEndY);

      // p5.pop();
    }

    // draw the buffer to the main canvas
    // TODO apply some more filters to add noise
    p5.image(treeCanvas, 0, 0);

    treeCanvas.remove();
  };

  // windowResized={handleResize}
  return <Sketch setup={setup} draw={draw} />;
};
export default ForestRenderer;
