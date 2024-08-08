import React, { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'

function Model() {
  const groupRef = useRef()
  const [obj, setObj] = useState(null)

  useEffect(() => {
    const mtlLoader = new MTLLoader()
    mtlLoader.load('/burningCube/cube.mtl', (materials) => {
      materials.preload()

      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load('/burningCube/cube.obj', (loadedObj) => {
        setObj(loadedObj)
      })
    })
  }, [])

  return (
    <group ref={groupRef}>
      {obj && <primitive object={obj} scale={[0.1, 0.1, 0.1]} />}
    </group>
  )
}

export default function App() {
  return (
    <Canvas camera={{ fov: 40, near: 0.1, far: 1000, position: [-15.5, 15.5, 5.5] }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} intensity={0.8} castShadow />
      <Model />
      <OrbitControls />
    </Canvas>
  )
}
