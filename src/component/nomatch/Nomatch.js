import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => (mesh.current.rotation.x += 0.04));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 2, 3]} />  
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export default function Nomatch() {
  return (
    <div>
      <Canvas>
        <ambientLight />
        <pointLight position={[20, 20, 20]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <h1>Page not found</h1>
      <Link to="/">
        <Button colorScheme="teal">Back to home</Button>
      </Link>
    </div>
  );
}
