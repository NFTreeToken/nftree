import React, { useRef } from 'react';
import Sketch from 'react-p5';
import MersenneTwister from 'mersenne-twister';
import * as P5 from 'p5';


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

let DEFAULT_SIZE = 500;

const SEED = Math.random();

const CustomStyle = ({
  block,
  canvasRef,
  attributesRef,
  width,
  height,
  handleResize,
  mod1 = 0.75, // Example: replace any number in the code with mod1, mod2, or color values
  mod2 = 0.25,
  backgroundColor = '#222',
  barkColor = '#FF00FF',
  treeFillColor = '#00FF00',
  ringColor = '#0000FF',
  wiggle = 0.02,
  numRings = 30, // should be tied to length of investment? or maybe overall size
  scale = 1,
}) => {
  const shuffleBag: any = useRef();
  const hoistedValue: any = useRef();

  // setup() initializes p5 and the canvas element, can be mostly ignored in our case (check draw())
  const setup = (p5, canvasParentRef) => {
    // Keep reference of canvas element for snapshots
    let _p5 = p5.createCanvas(width, height).parent(canvasParentRef);
    canvasRef.current = p5;

    attributesRef.current = () => {
      return {
        // This is called when the final image is generated, when creator opens the Mint NFT modal.
        // should return an object structured following opensea/enjin metadata spec for attributes/properties
        // https://docs.opensea.io/docs/metadata-standards
        // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1155.md#erc-1155-metadata-uri-json-schema

        attributes: [
          {
            display_type: 'number',
            trait_type: 'your trait here number',
            value: hoistedValue.current, // using the hoisted value from within the draw() method, stored in the ref.
          },

          {
            trait_type: 'your trait here text',
            value: 'replace me',
          },
        ],
      };
    };
  };

  // draw() is called right after setup and in a loop
  // disabling the loop prevents controls from working correctly
  // code must be deterministic so every loop instance results in the same output

  // Basic example of a drawing something using:
  // a) the block hash as initial seed (shuffleBag)
  // b) individual transactions in a block (seed)
  // c) custom parameters creators can customize (mod1, color1)
  // d) final drawing reacting to screen resizing (M)
  const draw = (p5: P5) => {
    let WIDTH = width;
    let HEIGHT = height;
    let DIM = Math.min(WIDTH, HEIGHT);
    let M = DIM / DEFAULT_SIZE;

    // seed random number generator
    const blockHash: string = block.hash;
    let seed = parseInt(blockHash.substr(0, 16), 16);
    shuffleBag.current = new MersenneTwister(seed);
    // let objs = block.transactions.map((t) => {
    //   let seed = parseInt(t.hash.slice(0, 16), 16);
    //   return {
    //     y: shuffleBag.current.random(),
    //     x: shuffleBag.current.random(),
    //     radius: seed / 1000000000000000,
    //   };
    // });

    // since the drawing is actually in a loop, we need to set a seed or it changes on each render

    // the seeds will need to be set based on block data to keep things deterministic
    // but better for now to see many variations while we work, so we use a single seed per reload

    // p5.randomSeed(parseInt(`0x${blockHash.substr(2, 14)}`, 16));
    // p5.noiseSeed(parseInt(`0x${blockHash.substr(16, 14)}`, 16));

    p5.randomSeed(SEED);
    p5.noiseSeed(SEED);




    p5.background(backgroundColor);

    // create an graphics buffer to draw to, so we can apply effects to
    // before adding to the main canvas
    const ringsCanvas = p5.createGraphics(WIDTH, HEIGHT);
    ringsCanvas.translate(WIDTH/2, HEIGHT/2);

    ringsCanvas.noStroke();
    ringsCanvas.fill(barkColor);
    let radius = width * .42;

    // draw outermost ring (the bark)
    drawRing(p5, ringsCanvas, radius);

    // draw fill inside of tree
    radius = Math.floor(radius * .9);
    ringsCanvas.fill(treeFillColor);
    drawRing(p5, ringsCanvas, radius);

    // draw rings 1
    for(var i = 0; i < numRings; i++){
      radius = radius - (scale * 4) - (scale * p5.randomGaussian(0, 1));
      if (radius < 0) break;
      ringsCanvas.stroke(ringColor);
      ringsCanvas.strokeWeight(1);
      // ringsCanvas.strokeWeight(scale*(0.2+p5.random()))
      drawRing(p5, ringsCanvas, radius, 0.01 * i);
      // Z0 = Z0 + 0.03;
    }


    // draw the buffer to the main canvas
    // TODO apply some more filters to add noise
    p5.image(ringsCanvas, 0, 0);

    // example assignment of hoisted value to be used as NFT attribute later
    hoistedValue.current = 42;

    // objs.map((dot, i) => {
    //   p5.stroke(color1);
    //   p5.strokeWeight(1 + mod2 * 10);
    //   p5.ellipse(
    //     300 * dot.y * 6 * M,
    //     100 * dot.x * 6 * M,
    //     dot.radius * M * mod1
    //   );
    // });
  };

  let L = 0;
  function drawRing(p5, ringsCanvas, radius, Z0?) {

    ringsCanvas.beginShape();
    for(var i=0; i <= NUM_POINTS; i++){
      const X0 = wiggle*(100 + radius * p5.cos(L));
      const Y0 = wiggle*(100 + radius * p5.sin(L));
      let _rad = radius + 50*p5.noise(X0,Y0,Z0);
      const X = _rad*p5.cos(L);
      const Y = _rad*p5.sin(L);

      p5.vertex(X, Y);
      L = L + p5.TWO_PI/NUM_POINTS;
    }
    ringsCanvas.endShape();
  }

  return <Sketch setup={setup} draw={draw} windowResized={handleResize} />;
};

export default CustomStyle;

const styleMetadata = {
  name: '',
  description: '',
  image: '',
  creator_name: '',
  options: {
    mod1: 0.4,
    mod2: 0.1,
    color1: '#fff000',
    background: '#000000',
  },
};

export { styleMetadata };
