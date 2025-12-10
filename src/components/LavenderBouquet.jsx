import React, { useMemo } from 'react';
import * as THREE from 'three';

const LavenderStalk = ({ position, rotation, scale = 1, color = "#9C27B0" }) => {
    // Create randomized flower clusters
    const flowerClusters = useMemo(() => {
        return Array.from({ length: 12 }).map((_, i) => ({
            y: 0.6 + i * 0.05 + Math.random() * 0.02,
            rot: Math.random() * Math.PI * 2,
            scale: 0.8 + Math.random() * 0.4
        }));
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Stem - Slight curve could be added, but straight is fine for low poly */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.008, 0.008, 0.9, 6]} />
                <meshStandardMaterial color="#558B2F" roughness={0.8} />
            </mesh>

            {/* Flower Top */}
            <group>
                {flowerClusters.map((data, i) => (
                    <mesh key={i} position={[0, data.y, 0]} rotation={[0, data.rot, 0]} scale={data.scale}>
                        {/* Using Dodecahedron for a more faceted "flower" look */}
                        <dodecahedronGeometry args={[0.035, 0]} />
                        <meshStandardMaterial color={color} roughness={0.6} />
                    </mesh>
                ))}
                {/* Tip */}
                <mesh position={[0, 1.25, 0]}>
                    <coneGeometry args={[0.03, 0.1, 8]} />
                    <meshStandardMaterial color={color} roughness={0.6} />
                </mesh>
            </group>
        </group>
    );
};

const LavenderBouquet = ({ position, rotation, scale = 1 }) => {
    const stalks = useMemo(() => {
        // Generate a bunch of stalks with slight random variations
        return Array.from({ length: 15 }).map((_, i) => ({
            pos: [
                (Math.random() - 0.5) * 0.15,
                (Math.random() - 0.5) * 0.05,
                (Math.random() - 0.5) * 0.15
            ],
            rot: [
                (Math.random() - 0.5) * 0.3,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * 0.3
            ],
            color: Math.random() > 0.5 ? "#9C27B0" : "#BA68C8" // Mix of purples
        }));
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Wrapping Paper - Cone with open top */}
            <mesh position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.05, 0.8, 16, 1, true]} />
                <meshStandardMaterial color="#F3E5F5" side={THREE.DoubleSide} roughness={0.9} />
            </mesh>

            {/* Ribbon */}
            <mesh position={[0, 0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.06, 0.015, 8, 16]} />
                <meshStandardMaterial color="#E91E63" />
            </mesh>

            {/* Stalks */}
            {stalks.map((s, i) => (
                <LavenderStalk
                    key={i}
                    position={s.pos}
                    rotation={s.rot}
                    color={s.color}
                />
            ))}
        </group>
    );
};

export default LavenderBouquet;
