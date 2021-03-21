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
  mod1, // Example: replace any number in the code with mod1, mod2, or color values
  mod2,
  backgroundColor = '#ccc',
  treeFillColor = '#00FF00',
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

    const WIDTH = DEFAULT_SIZE;
    const HEIGHT = DEFAULT_SIZE;

    let DIM = Math.min(WIDTH, HEIGHT);
    let M = DIM / DEFAULT_SIZE;

    p5.fill(backgroundColor);
    p5.rect(0,0,WIDTH, HEIGHT)

    const XCENTER = WIDTH/2;
    const YCENTER = HEIGHT/2;
    

    // seed random number generator
    const blockHash: string = block.hash;
    let seed = parseInt(blockHash.substr(0, 16), 16);
    const pesudoRandomGen = shuffleBag.current = new MersenneTwister(seed);
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

    p5.randomSeed(seed);
    p5.noiseSeed(seed);


    const treeCanvas = p5.createGraphics(WIDTH, HEIGHT);
    treeCanvas.translate(XCENTER, YCENTER);
    treeCanvas.noFill();
    p5.background(backgroundColor);
    

    drawNFTree(mod1, 'btc')

    function drawNFTree(startingHeight, tokenSymbol) {
      const startingBranchWeight = Math.max(3, 50*startingHeight)
      const startingBranchHeight = Math.max(30, mod1 * 325)
      const tokenToConfig = {
        'eth': {color: 333},
        'btc': {color: 111}
      }
      const startingColor = tokenToConfig[tokenSymbol].color
      branch(width/2, height, p5.radians(-90), startingBranchHeight, startingBranchWeight, 10, startingColor)
    }

    function branch(startX, startY, branchAngle, branchLength, branchWeight, twigSteps, branchColor) {
      
      let twigStartX = startX;
      let twigStartY = startY;
      const twigLength = branchLength / twigSteps;
      const branchEndWeight = branchWeight * 0.4

      for(let i = 0; i < twigSteps; i++){
      
        let twigRandAngle = p5.random(-p5.PI, p5.PI) * 0.05;
        let twigRandLength = p5.random(0.5, 1.5);
        let twigEndX = twigStartX + p5.cos(branchAngle + twigRandAngle) * (twigLength *  twigRandLength);
        let twigEndY = twigStartY + p5.sin(branchAngle + twigRandAngle) * (twigLength *  twigRandLength);
        let twigWeight = p5.map(i, 0, twigSteps, branchWeight, branchEndWeight);

        drawTwig(twigStartX, twigStartY, twigEndX, twigEndY, twigWeight, branchColor);

        twigStartX = twigEndX;
        twigStartY = twigEndY;
      }

      //Create sub branches
      if( branchWeight > 1 ){ 
        
        let branchNum = Math.trunc(p5.random(2, 8));

        for(let i = 0; i < branchNum; i++){
        
            let newBranchX = twigStartX;
            let newBranchY = twigStartY;
            let newBranchAngle = branchAngle + p5.random(-p5.PI/3, p5.PI/3);
            let newBranchLength = branchLength * 0.6;
            let newBranchWeight = branchEndWeight;
            let newTwigSteps = Math.trunc(twigSteps*0.9);
            let newBranchColor = Math.trunc(branchColor*0.9);
            
          branch(newBranchX, newBranchY, newBranchAngle, newBranchLength, newBranchWeight, newTwigSteps, newBranchColor);
        }
      } 
    }

    function drawTwig(twigStartX, twigStartY, twigEndX, twigEndY, twigWeight, twigColor){
      p5.push();

      if(twigWeight < 2){
        p5.stroke(twigColor, 100, 40) 
      }
      else {
        p5.stroke(71,32,0)
      }
      p5.strokeWeight(twigWeight*0.4);
      p5.line(twigStartX, twigStartY, twigEndX, twigEndY);

      p5.pop()
    
    }
    

    // draw the buffer to the main canvas
    // TODO apply some more filters to add noise
    p5.image(treeCanvas, 0, 0);

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
