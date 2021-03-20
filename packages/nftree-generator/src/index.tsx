import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import useDimensions from 'react-cool-dimensions';
import blocks from './blocks';
import CustomStyleRings, { styleMetadata as ringsMetadata } from './CustomStyleRings';
import CustomStyleTree, { styleMetadata as treeMetadata } from './CustomStyleTree';
import Sidebar from './components/Sidebar';
import { proxy, useProxy } from 'valtio';

const store = proxy({
  ...ringsMetadata,
});

/*
  Wrapped Component required to make p5 demos compatible with EthBlock.art
  As a creative coder, you can ignore this file, check CustomStyle.js
*/
function App() {
  const [blockNumber, setBlockNumber] = useState(1);
  const defaultRenderer = (window.location.search || '?rings').substr(1);
  const [renderer, setRenderer] = useState(defaultRenderer);
  const snap = useProxy(store);
  const canvasRef = useRef();
  const attributesRef = useRef();
  const { ref, width, height }: { ref: any, width: number, height: number } = useDimensions({})

  const _onCanvasResize = (p5) => {
    p5.resizeCanvas(width, height);
  };

  const mods = Object.keys(store.options).map((k) => {
    return {
      key: k,
      value: snap.options[k],
      set: (v) => {
        store.options[k] = v;
      },
    };
  });

  const CustomStyle = renderer === 'rings' ? CustomStyleRings : CustomStyleTree;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <div style={{ flexGrow: 1 }}>
        <div
          ref={ref}
          style={{
            margin: '0 auto',
            marginTop: '24px',
            width: '50vw',
            height: '50vw',
          }}
        >
          <h3>EthBlock.art P5.js boilerplate</h3>
          {width && height ? (
            <CustomStyle
              width={width}
              block={blocks[blockNumber]}
              height={height}
              canvasRef={canvasRef}
              attributesRef={attributesRef}
              handleResize={_onCanvasResize}
              {...snap.options}
            />
          ) : null}
        </div>
      </div>

      <Sidebar
        blocks={blocks}
        blockNumber={blockNumber}
        renderer={renderer}
        attributes={attributesRef.current || {}}
        mods={mods}
        handleBlockChange={(e) => setBlockNumber(e)}
        handleRendererChange={(e) => setRenderer(e)}
      />
    </div>
  );
}

// export default App;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
