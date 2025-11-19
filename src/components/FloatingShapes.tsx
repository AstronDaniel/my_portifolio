"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Octahedron, Tetrahedron } from "@react-three/drei";

function FloatingShape({ position, color, Shape, scale = 1 }: any) {
  const meshRef = useRef<any>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Shape args={[1, 0]} position={position} scale={scale} ref={meshRef}>
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          wireframe
        />
      </Shape>
    </Float>
  );
}

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <FloatingShape Shape={Icosahedron} position={[-4, 2, -5]} color="#3b82f6" scale={1.5} />
        <FloatingShape Shape={Octahedron} position={[4, -3, -2]} color="#8b5cf6" scale={2} />
        <FloatingShape Shape={Tetrahedron} position={[-3, -4, -4]} color="#10b981" scale={1.2} />
        <FloatingShape Shape={Icosahedron} position={[5, 3, -6]} color="#ef4444" scale={1.8} />
      </Canvas>
    </div>
  );
}
