'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Santa con trineo animado
function Santa() {
    const santaRef = useRef<THREE.Group>(null);
    const waveRef = useRef(0);

    useFrame((state) => {
        if (!santaRef.current) return;

        // Movimiento de vuelo suave
        santaRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        santaRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 2;

        // Rotación suave
        santaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

        // Santa saludando
        waveRef.current = Math.sin(state.clock.elapsedTime * 3) * 0.3;
    });

    return (
        <group ref={santaRef} position={[0, 0, 0]}>
            {/* Cuerpo de Santa */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#dc2626" />
            </mesh>

            {/* Cabeza */}
            <mesh position={[0, 0.7, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshStandardMaterial color="#fbbf24" />
            </mesh>

            {/* Gorro */}
            <mesh position={[0, 1.1, 0]}>
                <coneGeometry args={[0.35, 0.5, 32]} />
                <meshStandardMaterial color="#dc2626" />
            </mesh>

            {/* Pompón del gorro */}
            <mesh position={[0, 1.4, 0]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Brazo saludando */}
            <group position={[0.6, 0.3, 0]} rotation={[0, 0, waveRef.current]}>
                <mesh>
                    <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
                    <meshStandardMaterial color="#dc2626" />
                </mesh>
                {/* Mano */}
                <mesh position={[0, -0.3, 0]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#fbbf24" />
                </mesh>
            </group>

            {/* Trineo */}
            <mesh position={[0, -0.8, 0]}>
                <boxGeometry args={[1.5, 0.3, 0.8]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>

            {/* Bolsa de regalos */}
            <mesh position={[-0.5, 0, 0.3]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color="#7c2d12" />
            </mesh>
        </group>
    );
}

// Renos corriendo
function Reindeer({ position }: { position: [number, number, number] }) {
    const reindeerRef = useRef<THREE.Group>(null);
    const legRef = useRef(0);

    useFrame((state) => {
        if (!reindeerRef.current) return;

        // Movimiento de vuelo
        reindeerRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.2;

        // Piernas corriendo
        legRef.current = Math.sin(state.clock.elapsedTime * 8) * 0.3;
    });

    return (
        <group ref={reindeerRef} position={position}>
            {/* Cuerpo */}
            <mesh>
                <boxGeometry args={[0.6, 0.3, 0.3]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>

            {/* Cabeza */}
            <mesh position={[0.4, 0.2, 0]}>
                <boxGeometry args={[0.3, 0.25, 0.25]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>

            {/* Cuernos */}
            <mesh position={[0.4, 0.5, -0.1]}>
                <coneGeometry args={[0.05, 0.4, 8]} />
                <meshStandardMaterial color="#d4a574" />
            </mesh>
            <mesh position={[0.4, 0.5, 0.1]}>
                <coneGeometry args={[0.05, 0.4, 8]} />
                <meshStandardMaterial color="#d4a574" />
            </mesh>

            {/* Nariz roja (Rudolph) */}
            {position[0] === 2 && (
                <mesh position={[0.6, 0.2, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={2} />
                </mesh>
            )}

            {/* Piernas */}
            <group position={[0, -0.3, 0]} rotation={[legRef.current, 0, 0]}>
                <mesh position={[0.2, 0, 0.1]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>
                <mesh position={[0.2, 0, -0.1]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
                    <meshStandardMaterial color="#8b4513" />
                </mesh>
            </group>
        </group>
    );
}

// Regalos cayendo
function FallingGift({ initialPosition }: { initialPosition: [number, number, number] }) {
    const giftRef = useRef<THREE.Mesh>(null);
    const [position, setPosition] = React.useState(initialPosition);

    useFrame(() => {
        if (!giftRef.current) return;

        // Caer hacia abajo
        setPosition(([x, y, z]) => {
            const newY = y - 0.02;
            // Reset cuando llega abajo
            return newY < -5 ? [initialPosition[0], initialPosition[1], initialPosition[2]] : [x, newY, z];
        });

        // Rotación mientras cae
        giftRef.current.rotation.x += 0.05;
        giftRef.current.rotation.y += 0.03;
    });

    const colors = ['#dc2626', '#16a34a', '#2563eb', '#eab308'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <mesh ref={giftRef} position={position}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
}

// Estela de estrellitas tipo cometa
function StarTrail() {
    const starsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(200 * 3);
        for (let i = 0; i < 200; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10 - 5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
        }
        return positions;
    }, []);

    useFrame((state) => {
        if (!starsRef.current) return;

        const positions = starsRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < 200; i++) {
            positions[i * 3] -= 0.05; // Mover hacia atrás

            // Reset cuando sale de la pantalla
            if (positions[i * 3] < -10) {
                positions[i * 3] = 5;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 3;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
            }
        }
        starsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={starsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={200}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                color="#fbbf24"
                transparent
                opacity={0.8}
                sizeAttenuation
            />
        </points>
    );
}

// Componente principal
export function Santa3DScene() {
    return (
        <div className="w-full h-[500px] rounded-2xl overflow-hidden">
            <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
                {/* Iluminación */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

                {/* Fondo de estrellas */}
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                {/* Santa con trineo */}
                <Santa />

                {/* Renos en formación */}
                <Reindeer position={[2, 0.5, 0]} />
                <Reindeer position={[2.8, 0.5, 0.5]} />
                <Reindeer position={[2.8, 0.5, -0.5]} />
                <Reindeer position={[3.6, 0.5, 0]} />

                {/* Regalos cayendo */}
                {[...Array(8)].map((_, i) => (
                    <FallingGift
                        key={i}
                        initialPosition={[-0.5 + Math.random() * 0.3, Math.random() * 2, 0.3 + Math.random() * 0.3]}
                    />
                ))}

                {/* Estela de estrellitas */}
                <StarTrail />

                {/* Controles opcionales (comentar en producción) */}
                {/* <OrbitControls /> */}
            </Canvas>
        </div>
    );
}
