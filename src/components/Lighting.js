// Lighting.js
import React from 'react';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={0.3} position={[0, 50, 0]} />
    </>
  );
}
