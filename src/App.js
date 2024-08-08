// App.js
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Room from './components/Room';
import Lighting from './components/Lighting';
import { OrbitControls } from '@react-three/drei';

export default function App() {
  const [cutPlanePosition, setCutPlanePosition] = useState(0);
  const xPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), cutPlanePosition);

  return (
    <Canvas 
      gl={{ localClippingEnabled: true }}
      camera={{ fov: 50, near: 0.1, far: 1000, position: [-50.5, 50.5, 50.5] }}>
      
      <Lighting /> {/* Lighting setup */}
      <Room xPlane={xPlane} /> {/* Render the room model */}
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 15}
        minAzimuthAngle={-Math.PI / 1.7}
        enableDamping={false}
        showCursor={false}
      />
    </Canvas>
  );
}
