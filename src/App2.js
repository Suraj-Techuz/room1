import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'

function RotatingWall({ xPlane }) {
  const { scene: wallScene } = useGLTF('/wall.glb') // Adjust the path to your Wall.glb file
  const groupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2 // Adjust the speed as needed
    }
  })

  const planeHelper = new THREE.PlaneHelper(xPlane, 3, 0x999999)

  return (
    <group ref={groupRef}>
      {/* <primitive object={planeHelper} /> */}
      <primitive object={wallScene} position={[-2.5, 2, 1.1]} scale={[0.01, 0.01, 0.01]} />
    </group>
  )
}

export default function App() {
  const { cutPlanePosition } = useControls({
    cutPlanePosition: {
      value: 0,
      min: -2,
      max: 2,
      step: 0.01,
      onChange: (v) => {
        xPlane.constant = v
      }
    }
  })

  const [xPlane] = useState(new THREE.Plane(new THREE.Vector3(1, 0, 0), cutPlanePosition))

  return (
    <Canvas gl={{ localClippingEnabled: true }} camera={{ fov: 45, near: 0.1, far: 1000, position: [-2.5, 5.5, 2.5] }}> {/* Increased Y position by 20 */}
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={0.3} position={[0, 50, 0]} />

      <RotatingWall xPlane={xPlane} />
      
      {/* Uncomment to add grid */}
      {/* <Grid infiniteGrid cellSize={0.1} sectionSize={1} fadeDistance={10} sectionColor="darkgrey" /> */}
      
      {/* Uncomment to use cutter */}
      {/* <Cutter plane={xPlane}>
        <RotatingWall xPlane={xPlane} />
      </Cutter> */}

      <OrbitControls 
        enableZoom={false} // Disable zoom
        enablePan={false} // Disable panning (up/down movement)
        maxPolarAngle={Math.PI / 2.6} // Limit vertical movement
        minPolarAngle={Math.PI / 2.6} // Lock vertical angle
      />
      
      <Stats />
    </Canvas>
  )
}
