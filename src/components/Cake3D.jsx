import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const FrostingBalls = ({ radius, count, y, scale = 1 }) => {
    return (
        <group position={[0, y, 0]} scale={scale}>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <mesh key={i} position={[x, 0, z]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#FFF" roughness={0.4} />
                    </mesh>
                );
            })}
        </group>
    );
};

const Cake3D = ({ isBlowing = false, candleOut = false }) => {
    const flameRef = useRef();
    const flameCoreRef = useRef();
    const leftFlameRef = useRef();
    const rightFlameRef = useRef();
    const flameScale = useRef(1);

    useFrame((state) => {
        const time = state.clock.elapsedTime;

        // Calculate flame animation values
        let scale = 1;
        let offsetX = 0;
        let offsetZ = 0;
        let rotZ = 0;

        if (candleOut) {
            scale = Math.max(0, flameScale.current - 0.05);
            flameScale.current = scale;
        } else if (isBlowing) {
            // Struggling flame - intense flickering
            const struggle = Math.sin(time * 30) * 0.4 + Math.sin(time * 50) * 0.2;
            scale = 0.4 + struggle * 0.3;
            offsetX = Math.sin(time * 25) * 0.08;
            offsetZ = Math.cos(time * 20) * 0.06;
            rotZ = Math.sin(time * 15) * 0.5;
            flameScale.current = scale;
        } else {
            // Normal gentle flicker
            scale = 1 + Math.sin(time * 10) * 0.1;
            flameScale.current = scale;
        }

        // Animate main flame
        if (flameRef.current && flameCoreRef.current) {
            flameRef.current.scale.setScalar(flameScale.current);
            flameCoreRef.current.scale.setScalar(flameScale.current * 0.5);
            flameRef.current.position.x = offsetX;
            flameRef.current.position.z = offsetZ;
            flameRef.current.rotation.z = rotZ;
            flameRef.current.position.y = 2.45 + Math.sin(time * 20) * 0.02;
        }

        // Animate left pin candle flame
        if (leftFlameRef.current) {
            leftFlameRef.current.scale.setScalar(flameScale.current * 0.8);
            leftFlameRef.current.position.x = offsetX * 0.5;
            leftFlameRef.current.position.z = offsetZ * 0.5;
            leftFlameRef.current.rotation.z = rotZ * 0.7;
        }

        // Animate right pin candle flame
        if (rightFlameRef.current) {
            rightFlameRef.current.scale.setScalar(flameScale.current * 0.8);
            rightFlameRef.current.position.x = -offsetX * 0.5; // Opposite direction
            rightFlameRef.current.position.z = offsetZ * 0.5;
            rightFlameRef.current.rotation.z = -rotZ * 0.7;
        }
    });

    return (
        <group scale={0.5}>
            {/* Plate - more defined */}
            <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2.6, 2.6, 0.2, 64]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.1} />
            </mesh>

            {/* Base Layer */}
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[2, 2, 1, 64]} />
                <meshStandardMaterial color="#B76E79" roughness={0.5} />
            </mesh>
            {/* Base Layer Frosting */}
            <FrostingBalls radius={2} count={24} y={0.1} />

            {/* Top Layer */}
            <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[1.5, 1.5, 0.8, 64]} />
                <meshStandardMaterial color="#E0BFB8" roughness={0.5} />
            </mesh>
            {/* Top Layer Frosting */}
            <FrostingBalls radius={1.5} count={18} y={1.05} />

            {/* Top Surface Frosting Ring */}
            <FrostingBalls radius={1.4} count={16} y={1.75} scale={0.6} />

            {/* Main Center Candle */}
            <mesh position={[0, 1.9, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                <meshStandardMaterial color="#FFF9C4" />
            </mesh>

            {/* Left Pin Candle with Holder */}
            <group position={[-0.6, 1.75, 0]}>
                {/* Holder - cute flower shape */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.06, 0.08, 8]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Holder rim */}
                <mesh position={[0, 0.04, 0]}>
                    <torusGeometry args={[0.07, 0.02, 8, 16]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Pin Candle - pink with stripes */}
                <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
                    <meshStandardMaterial color="#FF69B4" />
                </mesh>
                {/* Candle stripe decorations */}
                <mesh position={[0, 0.25, 0]}>
                    <torusGeometry args={[0.045, 0.008, 8, 12]} />
                    <meshStandardMaterial color="#FFF" />
                </mesh>
                <mesh position={[0, 0.4, 0]}>
                    <torusGeometry args={[0.045, 0.008, 8, 12]} />
                    <meshStandardMaterial color="#FFF" />
                </mesh>
                {/* Tiny flame */}
                {!candleOut && (
                    <group ref={leftFlameRef} position={[0, 0.65, 0]}>
                        <mesh>
                            <coneGeometry args={[0.04, 0.12, 12]} />
                            <meshBasicMaterial color={isBlowing ? "#FF5722" : "#FF9800"} />
                        </mesh>
                        <mesh position={[0, -0.03, 0]} scale={0.4}>
                            <sphereGeometry args={[0.04, 8, 8]} />
                            <meshBasicMaterial color="#FFEB3B" />
                        </mesh>
                    </group>
                )}
            </group>

            {/* Right Pin Candle with Holder */}
            <group position={[0.6, 1.75, 0]}>
                {/* Holder - cute flower shape */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.06, 0.08, 8]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Holder rim */}
                <mesh position={[0, 0.04, 0]}>
                    <torusGeometry args={[0.07, 0.02, 8, 16]} />
                    <meshStandardMaterial color="#FFD700" metalness={0.6} roughness={0.3} />
                </mesh>
                {/* Pin Candle - yellow with stripes */}
                <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
                    <meshStandardMaterial color="#FFE082" />
                </mesh>
                {/* Candle stripe decorations */}
                <mesh position={[0, 0.25, 0]}>
                    <torusGeometry args={[0.045, 0.008, 8, 12]} />
                    <meshStandardMaterial color="#FFF" />
                </mesh>
                <mesh position={[0, 0.4, 0]}>
                    <torusGeometry args={[0.045, 0.008, 8, 12]} />
                    <meshStandardMaterial color="#FFF" />
                </mesh>
                {/* Tiny flame */}
                {!candleOut && (
                    <group ref={rightFlameRef} position={[0, 0.65, 0]}>
                        <mesh>
                            <coneGeometry args={[0.04, 0.12, 12]} />
                            <meshBasicMaterial color={isBlowing ? "#FF5722" : "#FF9800"} />
                        </mesh>
                        <mesh position={[0, -0.03, 0]} scale={0.4}>
                            <sphereGeometry args={[0.04, 8, 8]} />
                            <meshBasicMaterial color="#FFEB3B" />
                        </mesh>
                    </group>
                )}
            </group>

            {/* Flame - only show if not completely out */}
            {!candleOut || flameScale.current > 0.01 ? (
                <>
                    <mesh ref={flameRef} position={[0, 2.45, 0]}>
                        <coneGeometry args={[0.1, 0.3, 16]} />
                        <meshBasicMaterial
                            color={isBlowing ? "#FF5722" : "#FF9800"}
                            transparent
                            opacity={candleOut ? 0 : 1}
                        />
                    </mesh>
                    {/* Flame Core */}
                    <mesh ref={flameCoreRef} position={[0, 2.35, 0]} scale={0.5}>
                        <sphereGeometry args={[0.1, 8, 8]} />
                        <meshBasicMaterial
                            color="#FFEB3B"
                            transparent
                            opacity={candleOut ? 0 : 1}
                        />
                    </mesh>
                </>
            ) : null}

            {/* Smoke when candle is blown out */}
            {candleOut && (
                <group position={[0, 2.5, 0]}>
                    {[0, 1, 2].map((i) => (
                        <mesh key={i} position={[0, i * 0.15, 0]}>
                            <sphereGeometry args={[0.05 - i * 0.01, 8, 8]} />
                            <meshBasicMaterial
                                color="#9E9E9E"
                                transparent
                                opacity={0.4 - i * 0.1}
                            />
                        </mesh>
                    ))}
                </group>
            )}
        </group>
    );
};

export default Cake3D;
