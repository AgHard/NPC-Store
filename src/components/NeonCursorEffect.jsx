import React, { useEffect, useRef } from 'react';

// Dynamic import of the module (since it's an ES module on a CDN)
const loadNeonCursor = async (element) => {
  const module = await import('https://unpkg.com/threejs-toys@0.0.8/build/threejs-toys.module.cdn.min.js');
  module.neonCursor({
    el: element,
    shaderPoints: 16,
    curvePoints: 80,
    curveLerp: 0.5,
    radius1: 5,
    radius2: 30,
    velocityTreshold: 10,
    sleepRadiusX: 100,
    sleepRadiusY: 100,
    sleepTimeCoefX: 0.0025,
    sleepTimeCoefY: 0.0025
  });
};

const NeonCursorEffect = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      loadNeonCursor(containerRef.current);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        margin: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        touchAction: 'pan-up',
        color: '#ffffff',
        fontFamily: "'Montserrat', sans-serif",
        textAlign: 'center',
        textShadow: '0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000',
        position: 'relative',
      }}
    >
      <h1
        style={{
          width: 'auto',
          lineHeight: '80px',
          margin: 'calc(50vh - 80px) auto 0',
          fontSize: '40px',
          textTransform: 'uppercase',
        }}
      >
        NEON<br />CURSOR
      </h1>
    </div>
  );
};

export default NeonCursorEffect;
