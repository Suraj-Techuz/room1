import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useControls } from 'leva'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

function RotatingRoom({ xPlane }) {
  const [obj, setObj] = useState(null)
  const groupRef = useRef()

  useEffect(() => {
    const loader = new OBJLoader()
    loader.load('/room.obj', (loadedObj) => {
      setObj(loadedObj)
    })
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0 // Adjust the speed as needed
    }
  })

  const planeHelper = new THREE.PlaneHelper(xPlane, 3, 0x999999)

  return (
    <group ref={groupRef}>
      <primitive object={planeHelper} />
      {obj && <primitive object={obj} position={[-5.7, -1.8, 10]} scale={[0.01, 0.01, 0.01]} />}
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
    <Canvas gl={{ localClippingEnabled: true }} camera={{ fov: 40, near: 0.1, far: 1000, position: [-15.5, 5.5, 5.5] }}>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.6} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={0.3} position={[0, 50, 0]} />

      <RotatingRoom xPlane={xPlane} />
      
      {/* Uncomment to add grid */}
      {/* <Grid infiniteGrid cellSize={0.1} sectionSize={1} fadeDistance={10} sectionColor="darkgrey" /> */}
      
      {/* Uncomment to use cutter */}
      {/* <Cutter plane={xPlane}>
        <RotatingRoom xPlane={xPlane} />
      </Cutter> */}

      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        maxPolarAngle={Math.PI / 1.7}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 15}  // Set your desired maximum angle here
        minAzimuthAngle={-Math.PI / 1.7}  // Set your desired minimum angle here
        enableDamping={false}  // Disable damping to remove the visual helpers
        showCursor={false}      // Disable the cursor when hovering over the canvas
      />
      
      {/* Remove the Stats component to hide performance stats */}
      {/* <Stats /> */}
    </Canvas>
  )
}
