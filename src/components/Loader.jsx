import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
const Loader = () => {
  return (
    <Html center>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          color: 'white',
        }}
      >
        <Canvas style={{ width: 50, height: 50 }}>
          <mesh>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="blue" />
          </mesh>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
        </Canvas>
        <p style={{ marginTop: 10 }}>Loading...</p>
      </div>
    </Html>
  );
};

export default Loader;

// import { Html, useProgress } from "@react-three/drei";

// const Loader = () => {
//   const { progress } = useProgress();
//   return (
//     <Html
//       as='div'
//       center
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//       }}
//     >
//       <span className='canvas-loader'></span>
//       <p
//         style={{
//           fontSize: 14,
//           color: "#F1F1F1",
//           fontWeight: 800,
//           marginTop: 40,
//         }}
//       >
//         {progress.toFixed(2)}%
//       </p>
//     </Html>
//   );
// };

// export default Loader;
