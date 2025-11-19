"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

function AnimatedSphere() {
  const sphereRef = useRef<any>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.distort = 0.4 + Math.sin(state.clock.getElapsedTime()) * 0.2;
    }
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2} ref={sphereRef}>
      <MeshDistortMaterial
        color="#4338ca"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
        metalness={1}
        wireframe={true}
      />
    </Sphere>
  );
}

function Core() {
  const coreRef = useRef<any>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={coreRef}>
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={2} />
      </Sphere>
    </group>
  );
}

export default function NexusCore() {
  return (
    <div className="absolute inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AnimatedSphere />
        <Core />
      </Canvas>
    </div>
  );
}
