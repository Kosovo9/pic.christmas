'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 🎅 SANTA SLEIGH COMPONENT
function SantaSleigh() {
    const groupRef = useRef<THREE.Group>(null);
    const santaRef = useRef<THREE.Group>(null);
    const timeRef = useRef(0);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        timeRef.current += delta;
        const t = timeRef.current;

        // CINEMATIC FLIGHT PATH - Figure 8 pattern with depth
        const radius = 8;
        const x = Math.sin(t * 0.3) * radius;
        const y = 2 + Math.sin(t * 0.5) * 1.5; // Vertical wave
        const z = Math.cos(t * 0.3) * radius * 0.5; // Depth movement

        groupRef.current.position.set(x, y, z);

        // BANKING TURNS - Like a real sleigh
        const bankAngle = Math.sin(t * 0.3) * 0.3;
        groupRef.current.rotation.z = bankAngle;
        groupRef.current.rotation.y = Math.atan2(
            Math.cos(t * 0.3) * 0.3,
            Math.sin(t * 0.3)
        );

        // SANTA WAVING - Smooth arm movement
        if (santaRef.current) {
            santaRef.current.rotation.z = Math.sin(t * 3) * 0.4;
        }
    });

    return (
        <group ref={groupRef}>
            {/* SANTA */}
            <group ref={santaRef} position={[0, 0.5, 0]}>
                {/* Body */}
                <mesh castShadow>
                    <capsuleGeometry args={[0.3, 0.8, 8, 16]} />
                    <meshStandardMaterial color="#DC143C" roughness={0.6} metalness={0.1} />
                </mesh>

                {/* Head */}
                <mesh position={[0, 0.8, 0]} castShadow>
                    <sphereGeometry args={[0.25, 32, 32]} />
                    <meshStandardMaterial color="#FFE4C4" roughness={0.4} />
                </mesh>

                {/* Hat */}
                <mesh position={[0, 1.1, 0]} castShadow>
                    <coneGeometry args={[0.3, 0.5, 32]} />
                    <meshStandardMaterial color="#DC143C" />
                </mesh>
                <mesh position={[0, 1.35, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>

                {/* Beard */}
                <mesh position={[0, 0.6, 0.2]} castShadow>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
                </mesh>

                {/* Waving Arm */}
                <mesh position={[0.4, 0.3, 0]} rotation={[0, 0, -0.5]} castShadow>
                    <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
                    <meshStandardMaterial color="#DC143C" />
                </mesh>
            </group>

            {/* SLEIGH */}
            <mesh position={[0, 0, 0]} castShadow>
                <boxGeometry args={[1.5, 0.4, 0.8]} />
                <meshStandardMaterial color="#8B4513" roughness={0.7} metalness={0.2} />
            </mesh>

            {/* Sleigh Runners */}
            <mesh position={[-0.6, -0.3, 0]} castShadow>
                <boxGeometry args={[0.1, 0.1, 1]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.6, -0.3, 0]} castShadow>
                <boxGeometry args={[0.1, 0.1, 1]} />
                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
            </mesh>
        </group>
    );
}

// 🦌 REINDEER WITH WALKING ANIMATION
function Reindeer({ position, delay = 0, isRudolph = false }: { position: [number, number, number], delay?: number, isRudolph?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const legRefs = useRef<THREE.Mesh[]>([]);

    useFrame((state) => {
        if (!groupRef.current) return;

        const t = state.clock.elapsedTime + delay;

        // GALLOPING MOTION - Up and down
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(t * 8)) * 0.15;

        // LEG ANIMATION - Walking cycle
        legRefs.current.forEach((leg, i) => {
            if (leg) {
                const offset = i * Math.PI / 2;
                leg.rotation.x = Math.sin(t * 8 + offset) * 0.6;
            }
        });
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Body */}
            <mesh castShadow>
                <capsuleGeometry args={[0.2, 0.6, 8, 16]} />
                <meshStandardMaterial color="#8B4513" roughness={0.7} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.5, 0.4]} castShadow>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>

            {/* Nose - RED for Rudolph */}
            {isRudolph && (
                <mesh position={[0, 0.5, 0.55]}>
                    <sphereGeometry args={[0.06, 16, 16]} />
                    <meshStandardMaterial
                        color="#FF0000"
                        emissive="#FF0000"
                        emissiveIntensity={2}
                        toneMapped={false}
                    />
                    <pointLight color="#FF0000" intensity={1} distance={2} />
                </mesh>
            )}

            {/* Antlers */}
            <mesh position={[-0.1, 0.65, 0.3]} rotation={[0, 0, -0.5]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#654321" />
            </mesh>
            <mesh position={[0.1, 0.65, 0.3]} rotation={[0, 0, 0.5]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#654321" />
            </mesh>

            {/* Legs - 4 legs with refs for animation */}
            {[[-0.15, -0.5, 0.2], [0.15, -0.5, 0.2], [-0.15, -0.5, -0.2], [0.15, -0.5, -0.2]].map((pos, i) => (
                <mesh
                    key={i}
                    ref={(el) => { if (el) legRefs.current[i] = el; }}
                    position={pos as [number, number, number]}
                    castShadow
                >
                    <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
                    <meshStandardMaterial color="#654321" />
                </mesh>
            ))}
        </group>
    );
}

// 🎁 FALLING GIFTS
function FallingGifts() {
    const gifts = useMemo(() => {
        return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            startDelay: i * 2,
            color: ['#FF0000', '#00FF00', '#FFD700', '#FF1493'][i % 4],
            size: 0.15 + Math.random() * 0.1,
        }));
    }, []);

    return (
        <>
            {gifts.map((gift) => (
                <Gift key={gift.id} {...gift} />
            ))}
        </>
    );
}

function Gift({ startDelay, color, size }: { startDelay: number, color: string, size: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;

        const t = (state.clock.elapsedTime - startDelay) % 8;

        if (t < 0) {
            meshRef.current.visible = false;
            return;
        }

        meshRef.current.visible = true;
        meshRef.current.position.y = 4 - t * 1.5;
        meshRef.current.position.x = Math.sin(startDelay) * 3;
        meshRef.current.position.z = Math.cos(startDelay) * 2;
        meshRef.current.rotation.x = t * 2;
        meshRef.current.rotation.y = t * 3;
    });

    return (
        <mesh ref={meshRef} castShadow>
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
        </mesh>
    );
}

// ✨ STAR TRAIL PARTICLES
function StarTrail() {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const count = 300;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }

        return positions;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    const geometry = useMemo(() => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.BufferAttribute(particles, 3));
        return geom;
    }, [particles]);

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={0.05}
                color="#FFD700"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// 🎬 MAIN SCENE
export function Santa3DEpic() {
    return (
        <div className="fixed inset-0 pointer-events-none z-30" style={{ mixBlendMode: 'screen' }}>
            <Canvas shadows camera={{ position: [0, 3, 12], fov: 50 }}>
                {/* LIGHTING - Cinematic setup */}
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#FFE4C4" />

                {/* ENVIRONMENT */}
                <fog attach="fog" args={['#000033', 10, 30]} />

                {/* SANTA & SLEIGH */}
                <SantaSleigh />

                {/* REINDEER TEAM - 4 reindeer in formation */}
                <Reindeer position={[-1.5, 0.5, 2]} delay={0} isRudolph />
                <Reindeer position={[-0.5, 0.5, 2]} delay={0.2} />
                <Reindeer position={[0.5, 0.5, 2]} delay={0.4} />
                <Reindeer position={[1.5, 0.5, 2]} delay={0.6} />

                {/* FALLING GIFTS */}
                <FallingGifts />

                {/* STAR TRAIL */}
                <StarTrail />

                {/* GROUND PLANE for shadows */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                    <planeGeometry args={[50, 50]} />
                    <shadowMaterial opacity={0.2} />
                </mesh>
            </Canvas>
        </div>
    );
}
