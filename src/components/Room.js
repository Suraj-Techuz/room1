// Room.js
import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

export default function Room({ xPlane }) {
  const [obj, setObj] = useState(null);
  const groupRef = useRef();

  useEffect(() => {
    const mtlLoader = new MTLLoader();
    mtlLoader.setPath('/burningCube/'); // Set the path to the MTL file
    mtlLoader.load('cube.mtl', (materials) => {
      materials.preload(); // Preload the materials

      const objLoader = new OBJLoader();
      objLoader.setMaterials(materials); // Apply the materials to the OBJ loader
      objLoader.setPath('/burningCube/'); // Set the path to the OBJ file
      objLoader.load('cube.obj', (loadedObj) => {
        setObj(loadedObj); // Set the loaded object to state
      });
    });
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0; // Adjust the speed of rotation as needed
    }
  });

  return (
    <group ref={groupRef}>
      {obj && <primitive object={obj} position={[-5.7, -1.8, 10]} scale={[0.01, 0.01, 0.01]} />}
    </group>
  );
}
