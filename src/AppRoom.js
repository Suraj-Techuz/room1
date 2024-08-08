import { useState, useRef, useEffect } from 'react' // Import necessary hooks from React
import { Canvas, useFrame } from '@react-three/fiber' // Import Canvas and useFrame from React Three Fiber
import { OrbitControls } from '@react-three/drei' // Import OrbitControls for camera control
import * as THREE from 'three' // Import Three.js core library
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader' // Import OBJLoader to load OBJ files

// Component for rotating room
function RotatingRoom({ xPlane }) {
  const [obj, setObj] = useState(null) // State to hold the loaded OBJ model
  const groupRef = useRef() // Reference for the group containing the model

  // Load the OBJ model when the component mounts
  useEffect(() => {
    const loader = new OBJLoader() // Create a new OBJLoader instance
    loader.load('/room.obj', (loadedObj) => { // Load the OBJ file
      setObj(loadedObj) // Set the loaded object to state
    })
  }, []) // Empty dependency array ensures this runs once on mount

  // Rotate the room model each frame
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0 // Adjust the speed of rotation as needed
    }
  })

  // Create a plane helper for visualization
  const planeHelper = new THREE.PlaneHelper(xPlane, 3, 0x999999)

  return (
    <group ref={groupRef}> {/* Group to hold the room model and plane helper */}
      {/* <primitive object={planeHelper} /> Render the plane helper */}
      {obj && <primitive object={obj} position={[-5.7, -1.8, 10]} scale={[0.01, 0.01, 0.01]} />} {/* Render the loaded OBJ model if it exists */}
    </group>
  )
}

// Main application component
export default function App() {
  // Create a new Plane instance for cutting
  const [cutPlanePosition, setCutPlanePosition] = useState(0); // Initial value for the cut plane position
  const xPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), cutPlanePosition); // Create a Plane instance

  return (
    <Canvas 
      gl={{ localClippingEnabled: true }} // Enable local clipping in the WebGL context
      camera={{ fov: 40, near: 0.1, far: 1000, position: [-15.5, 15.5, 5.5] }}> {/* Set up camera properties */}
      
      {/* Lighting setup */}
      <ambientLight intensity={0.2} /> {/* Ambient light to illuminate the scene */}
      <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={0.8} castShadow /> {/* Spotlight with shadows */}
      <pointLight position={[-10, -10, -10]} intensity={0.6} /> {/* Point light to add depth */}
      <directionalLight position={[0, 10, 0]} intensity={0.5} /> {/* Directional light for overall illumination */}
      <hemisphereLight skyColor={'white'} groundColor={'darkslategrey'} intensity={0.3} position={[0, 50, 0]} /> {/* Hemisphere light for balanced lighting */}

      <RotatingRoom xPlane={xPlane} /> {/* Render the rotating room with the cutting plane */}

      {/* Camera controls to allow user interaction */}
      <OrbitControls 
        enableZoom={true} // Allow zooming in and out
        enablePan={true} // Allow panning around the scene
        maxPolarAngle={Math.PI / 1.7} // Limit the maximum angle for vertical rotation
        minPolarAngle={Math.PI / 2.5} // Limit the minimum angle for vertical rotation
        maxAzimuthAngle={Math.PI / 15} // Limit the maximum angle for horizontal rotation
        minAzimuthAngle={-Math.PI / 1.7} // Limit the minimum angle for horizontal rotation
        enableDamping={false} // Disable damping for smoother control
        showCursor={false} // Hide the cursor when hovering over the canvas
      />
    </Canvas>
  )
}
