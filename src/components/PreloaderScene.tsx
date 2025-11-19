"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";

function Globe() {
    const meshRef = useRef<THREE.Mesh>(null);

    // Generate random points for "cities"
    const points = useMemo(() => {
        const p = [];
        for (let i = 0; i < 50; i++) {
            const phi = Math.acos(-1 + (2 * i) / 50);
            const theta = Math.sqrt(50 * Math.PI) * phi;
            const x = 2 * Math.cos(theta) * Math.sin(phi);
            const y = 2 * Math.sin(theta) * Math.sin(phi);
            const z = 2 * Math.cos(phi);
            p.push(new THREE.Vector3(x, y, z));
        }
        return p;
    }, []);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <group>
            {/* Main Wireframe Sphere */}
            <mesh ref={meshRef}>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color="#1e40af" wireframe transparent opacity={0.3} />
            </mesh>

            {/* Inner Glow Sphere */}
            <mesh>
                <sphereGeometry args={[1.95, 32, 32]} />
                <meshBasicMaterial color="#000000" />
            </mesh>

            {/* Connection Nodes (Cities) */}
            <group rotation-y={0}>
                {points.map((point, i) => (
                    <mesh key={i} position={point}>
                        <sphereGeometry args={[0.03, 8, 8]} />
                        <meshBasicMaterial color="#60a5fa" />
                    </mesh>
                ))}
            </group>

            {/* Connecting Lines (Simulated) */}
            <lineSegments>
                <edgesGeometry args={[new THREE.IcosahedronGeometry(2, 1)]} />
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.1} />
            </lineSegments>
        </group>
    );
}

export default function PreloaderScene() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Globe />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
