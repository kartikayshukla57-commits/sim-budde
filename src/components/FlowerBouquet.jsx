import React, { useMemo } from 'react';
import * as THREE from 'three';

// Small delicate flower (like baby's breath)
const TinyFlower = ({ position, rotation, scale = 1, color = "#FFFFFF" }) => {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#FFEB3B" />
            </mesh>
            {/* Petals - 5 small spheres arranged in a circle */}
            {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i / 5) * Math.PI * 2;
                return (
                    <mesh
                        key={i}
                        position={[
                            Math.cos(angle) * 0.02,
                            0,
                            Math.sin(angle) * 0.02
                        ]}
                    >
                        <sphereGeometry args={[0.012, 6, 6]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                );
            })}
        </group>
    );
};

// Leaf/Greenery
const Leaf = ({ position, rotation, scale = 1 }) => {
    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh>
                <sphereGeometry args={[0.04, 8, 4]} />
                <meshStandardMaterial color="#4CAF50" flatShading />
            </mesh>
        </group>
    );
};

// Branch with flowers
const FlowerBranch = ({ position, rotation, scale = 1 }) => {
    const flowers = useMemo(() => {
        return Array.from({ length: 8 }).map((_, i) => ({
            pos: [
                (Math.random() - 0.5) * 0.15,
                0.1 + i * 0.08 + Math.random() * 0.05,
                (Math.random() - 0.5) * 0.15
            ],
            rot: [
                Math.random() * Math.PI,
                Math.random() * Math.PI * 2,
                0
            ],
            scale: 0.7 + Math.random() * 0.6
        }));
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Stem */}
            <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.008, 0.01, 0.8, 6]} />
                <meshStandardMaterial color="#558B2F" />
            </mesh>

            {/* Small flowers along the branch */}
            {flowers.map((f, i) => (
                <TinyFlower
                    key={i}
                    position={f.pos}
                    rotation={f.rot}
                    scale={f.scale}
                    color={["#E91E63", "#FF5722", "#FFEB3B", "#9C27B0", "#F44336"][i % 5]}
                />
            ))}
        </group>
    );
};

// Greenery Branch
const GreeneryBranch = ({ position, rotation, scale = 1 }) => {
    const leaves = useMemo(() => {
        return Array.from({ length: 6 }).map((_, i) => ({
            pos: [
                (Math.random() - 0.5) * 0.1,
                0.2 + i * 0.1,
                (Math.random() - 0.5) * 0.1
            ],
            rot: [
                Math.random() * 0.5,
                Math.random() * Math.PI * 2,
                Math.random() * 0.5
            ],
            scale: 0.5 + Math.random() * 0.5
        }));
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Stem */}
            <mesh position={[0, 0.35, 0]}>
                <cylinderGeometry args={[0.006, 0.008, 0.7, 6]} />
                <meshStandardMaterial color="#2E7D32" />
            </mesh>

            {/* Leaves */}
            {leaves.map((l, i) => (
                <Leaf
                    key={i}
                    position={l.pos}
                    rotation={l.rot}
                    scale={l.scale}
                />
            ))}
        </group>
    );
};

const FlowerBouquet = ({ position, rotation, scale = 1 }) => {
    const branches = useMemo(() => {
        // Generate flower branches
        const flowerBranches = Array.from({ length: 12 }).map((_, i) => ({
            type: 'flower',
            pos: [
                (Math.random() - 0.5) * 0.2,
                0,
                (Math.random() - 0.5) * 0.2
            ],
            rot: [
                (Math.random() - 0.5) * 0.4,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * 0.4
            ],
            scale: 0.8 + Math.random() * 0.4
        }));

        // Generate greenery branches
        const greenBranches = Array.from({ length: 6 }).map((_, i) => ({
            type: 'green',
            pos: [
                (Math.random() - 0.5) * 0.25,
                0,
                (Math.random() - 0.5) * 0.25
            ],
            rot: [
                (Math.random() - 0.5) * 0.5,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * 0.5
            ],
            scale: 0.9 + Math.random() * 0.3
        }));

        return [...flowerBranches, ...greenBranches];
    }, []);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            {/* Glass Vase - Body */}
            <mesh position={[0, 0.2, 0]}>
                <cylinderGeometry args={[0.25, 0.18, 0.45, 24, 1, true]} />
                <meshPhysicalMaterial
                    color="#4DB6AC"
                    transparent
                    opacity={0.6}
                    roughness={0.05}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={0.5}
                    side={THREE.DoubleSide}
                    envMapIntensity={1}
                />
            </mesh>

            {/* Vase bottom */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.18, 0.18, 0.03, 24]} />
                <meshPhysicalMaterial
                    color="#4DB6AC"
                    transparent
                    opacity={0.7}
                    roughness={0.05}
                    transmission={0.5}
                />
            </mesh>

            {/* Vase rim/top edge */}
            <mesh position={[0, 0.42, 0]}>
                <torusGeometry args={[0.25, 0.015, 8, 24]} />
                <meshPhysicalMaterial
                    color="#4DB6AC"
                    transparent
                    opacity={0.8}
                    roughness={0.05}
                />
            </mesh>

            {/* Water inside vase */}
            <mesh position={[0, 0.15, 0]}>
                <cylinderGeometry args={[0.22, 0.16, 0.3, 24]} />
                <meshPhysicalMaterial
                    color="#26A69A"
                    transparent
                    opacity={0.5}
                    roughness={0}
                />
            </mesh>

            {/* Branches */}
            {branches.map((b, i) => (
                b.type === 'flower' ? (
                    <FlowerBranch
                        key={i}
                        position={b.pos}
                        rotation={b.rot}
                        scale={b.scale}
                    />
                ) : (
                    <GreeneryBranch
                        key={i}
                        position={b.pos}
                        rotation={b.rot}
                        scale={b.scale}
                    />
                )
            ))}
        </group>
    );
};

export default FlowerBouquet;
