"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, OrbitControls, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";
import { portfolioData } from "@/data/portfolio";

function Word({ children, ...props }: { children: string; [key: string]: any }) {
  const color = new THREE.Color();
  const fontProps = {
    fontSize: 2.5,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
  };
  const ref = useRef<any>(null);
  const [hovered, setHovered] = React.useState(false);
  const over = (e: any) => (e.stopPropagation(), setHovered(true));
  const out = () => setHovered(false);

  useFrame(({ camera }) => {
    // Make text face the camera
    ref.current.quaternion.copy(camera.quaternion);
    // Animate color on hover
    ref.current.material.color.lerp(
      color.set(hovered ? "#3b82f6" : "white"),
      0.1
    );
  });

  return (
    <Text
      ref={ref}
      onPointerOver={over}
      onPointerOut={out}
      {...props}
      {...fontProps}
    >
      {children}
    </Text>
  );
}

function Cloud({ count = 4, radius = 20 }) {
  // Create a list of words
  const words = useMemo(() => {
    const temp: [THREE.Vector3, string][] = [];
    const skills = [
      ...portfolioData.skills.languages,
      ...portfolioData.skills.frameworks,
      ...portfolioData.skills.databases,
      ...portfolioData.skills.tools,
    ];
    
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < skills.length; i++) {
      // Distribute points on a sphere (Fibonacci Sphere)
      const y = 1 - (i / (skills.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiSpan * i;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      temp.push([new THREE.Vector3(x * radius, y * radius, z * radius), skills[i]]);
    }
    return temp;
  }, [radius]);

  return (
    <>
      {words.map(([pos, word], index) => (
        <Word key={index} position={pos} children={word} />
      ))}
    </>
  );
}

function GyroscopeRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Torus args={[22, 0.2, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#3b82f6" transparent opacity={0.3} wireframe />
      </Torus>
      <Torus args={[25, 0.2, 16, 100]} rotation={[0, Math.PI / 2, 0]}>
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} wireframe />
      </Torus>
      <Torus args={[28, 0.2, 16, 100]}>
        <meshStandardMaterial color="#10b981" transparent opacity={0.3} wireframe />
      </Torus>
    </group>
  );
}

export default function SkillsSphere() {
  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 40], fov: 90 }}>
        <fog attach="fog" args={["#030014", 0, 80]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Cloud count={8} radius={20} />
        <GyroscopeRings />
        <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
      </Canvas>
    </div>
  );
}
