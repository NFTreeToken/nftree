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

// fetch data from thegraph
// (async function go() {
//   const prices = await getPricingData(SELECTED_TOKEN, '2020-09-01', '2020-10-20');
//   console.log(prices);
// })();

const START_DATE_ISO = '2020-12-10';
const END_DATE_ISO = '2021-02-15';

const priceData = _.filter(ETH_PRICE_DATA, (item) => (item.date > START_DATE_ISO && item.date <= END_DATE_ISO));
console.log(priceData);

let noiseZ = 0;

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

const NUM_POINTS = 1000;

const DEFAULT_SIZE = 3000;

const SEED = Math.random();
// const SEED = 10;

const RingsRenderer = ({
  // canvasRef,
  // attributesRef,
  backgroundColor = '#222',
  barkColor = '#FF0000',
  treeFillColor = '#00FF00',
  ringColor = '#0000FF',
  scale = 1,
}) => {
  const TOKEN_LOGOS: Record<string, P5.Image> = {};

  let canvas: P5.Renderer;

  // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
  const setup = (p5: P5, canvasParentRef) => {
    console.log('called setup');
    console.log(canvasParentRef);
    // Keep reference of canvas element for snapshots
    canvas = p5.createCanvas(DEFAULT_SIZE, DEFAULT_SIZE).parent(canvasParentRef);
    p5.pixelDensity(p5.displayDensity());
    console.log(`setting pixel density to: ${p5.displayDensity()}`);
    // _p5.style('display', 'block');
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

  // Basic example of a drawing something using:
  // a) the block hash as initial seed (shuffleBag)
  // b) individual transactions in a block (seed)
  // c) custom parameters creators can customize (mod1, color1)
  // d) final drawing reacting to screen resizing (M)

  let numFramesToShow = 1;

  const draw = (p5: P5) => {
    p5.randomSeed(SEED);
    p5.noiseSeed(SEED);
    // if (drawn) return;
    // drawn = true;
    // let WIDTH = width;
    // let HEIGHT = height;
    const WIDTH = DEFAULT_SIZE;
    const HEIGHT = DEFAULT_SIZE;

    // p5.clear and p5.background dont seem to work properly
    // due to bugs around screen pixel density...
    // so we just paint over the whole canvas instead
    p5.fill(backgroundColor);
    p5.rect(0, 0, WIDTH, HEIGHT);

    const XCENTER = WIDTH / 2;
    const YCENTER = HEIGHT / 2;
    const DIM = Math.min(WIDTH, HEIGHT);
    const IMAGE_SIZE_MULTIPLIER = 0.8;

    let L = 0;

    // seed random number generator
    // since the drawing is actually in a loop, we need to set a seed or it changes on each render

    // the seeds will need to be set based on block data to keep things deterministic
    // but better for now to see many variations while we work, so we use a single seed per reload

    // p5.randomSeed(parseInt(`0x${blockHash.substr(2, 14)}`, 16));
    // p5.noiseSeed(parseInt(`0x${blockHash.substr(16, 14)}`, 16));

    // show framerate
    const fps = p5.frameRate();
    p5.fill(100);
    p5.color('#FFF');
    p5.textSize(50);
    p5.text(`FPS: ${fps.toFixed(0)}`, 10, 100);

    // show date and price
    p5.fill('#FFFFFF');
    p5.textSize(100);
    const dateStr = priceData[numFramesToShow - 1].date;
    const priceStr = priceData[numFramesToShow - 1].price.toFixed(2);
    p5.text(dateStr, 10, HEIGHT - 50);
    p5.text(`$${priceStr} USD`, 1500, HEIGHT - 50);

    // create an graphics buffer to draw to, so we can apply effects to
    // before adding to the main canvas
    const ringsCanvas = p5.createGraphics(WIDTH, HEIGHT);
    ringsCanvas.translate(XCENTER, YCENTER);

    ringsCanvas.fill('#FFF');
    ringsCanvas.stroke('#FFF');
    ringsCanvas.strokeWeight(2);

    // draw first ring
    let radius = 1;
    drawRing(radius, 1, 0);

    ringsCanvas.noFill();

    for (let i = 1; i < numFramesToShow; i++) {
      const { price } = priceData[i];

      const change = price / priceData[i - 1].price;

      let strokeWidth = 1;

      if (change < 1) {
        ringsCanvas.translate(1, -1);
        radius += 10;
      } else {
        ringsCanvas.translate(2, 2);
        radius += 12 + 40 * (change - 1);
        strokeWidth = 2 + 40 * (change - 1);
      }
      // console.log(`$${price} [${change}] - R${radius} S${strokeWidth}`)
      drawRing(radius, strokeWidth, i);
    }

    const barkThickness = radius * 0.03;

    radius += barkThickness + 5;
    drawRing(radius, barkThickness, priceData.length, true);

    ringsCanvas.noStroke();
    ringsCanvas.fill(barkColor);
    // let radius = WIDTH * .42;

    // // draw outermost ring (the bark)
    // drawRing(radius);

    // // draw fill inside of tree
    // radius = Math.floor(radius * .9);
    // ringsCanvas.fill(treeFillColor);
    // drawRing(radius);

    // draw the logo of the token
    // ringsCanvas.imageMode('center');
    // ringsCanvas.image(TOKEN_LOGOS.aETH, 0, 0, DIM * IMAGE_SIZE_MULTIPLIER, DIM * IMAGE_SIZE_MULTIPLIER)

    // // draw rings 1
    // ringsCanvas.noFill();
    // for(var i = 0; i < numRings; i++){
    //   radius = radius - (scale * 4) - (scale * p5.randomGaussian(0, 1));
    //   if (radius < 0) break;
    //   ringsCanvas.stroke(ringColor);
    //   ringsCanvas.strokeWeight(1);
    //   // ringsCanvas.strokeWeight(scale*(0.2+p5.random()))
    //   drawRing(radius, 0.01 * i);
    //   // Z0 = Z0 + 0.03;
    // }

    // draw the buffer to the main canvas
    // TODO apply some more filters to add noise
    p5.image(ringsCanvas, 0, 0);

    ringsCanvas.remove();

    // objs.map((dot, i) => {
    //   p5.stroke(color1);
    //   p5.strokeWeight(1 + mod2 * 10);
    //   p5.ellipse(
    //     300 * dot.y * 6 * M,
    //     100 * dot.x * 6 * M,
    //     dot.radius * M * mod1
    //   );
    // });

    function drawRing(ringRadius, weight, ringNumber, isFinal = false) {
      ringsCanvas.strokeWeight(weight);
      ringsCanvas.beginShape();
      for (let i = 0; i <= NUM_POINTS; i++) {
        // let _rad = ringRadius + 50*p5.noise(X0,Y0,Z0);
        let pointRadius = ringRadius + (10 + 60 * ringRadius / 1000) * p5.noise(
          0.005 * (ringRadius * p5.cos(L)),
          0.005 * (ringRadius * p5.sin(L)),
          noiseZ + 0.02 * ringNumber,
        );
        if (isFinal) {
          pointRadius = ringRadius + 50 * p5.noise(
            0.01 * (ringRadius * p5.cos(L)),
            0.01 * (ringRadius * p5.sin(L)),
          );
        }

        const X = pointRadius * p5.cos(L);
        const Y = pointRadius * p5.sin(L);

        p5.vertex(X, Y);
        L += p5.TWO_PI / NUM_POINTS;
      }
      ringsCanvas.endShape();
    }
    noiseZ += 0.1;
    numFramesToShow++;
    if (numFramesToShow > priceData.length) numFramesToShow = 1;
  };

  // windowResized={handleResize}
  return <Sketch setup={setup} draw={draw} />;
};
export default RingsRenderer;
