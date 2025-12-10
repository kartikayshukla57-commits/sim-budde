import React from 'react';
import * as THREE from 'three';

const FoodBasket = () => {
    return (
        <group>
            {/* Basket base - woven texture look, hollow from top */}
            <mesh position={[0, 0.15, 0]} castShadow>
                <cylinderGeometry args={[0.35, 0.3, 0.3, 16, 1, true]} />
                <meshStandardMaterial color="#8B4513" roughness={0.8} side={THREE.DoubleSide} />
            </mesh>

            {/* Basket rim */}
            <mesh position={[0, 0.3, 0]}>
                <torusGeometry args={[0.35, 0.03, 8, 16]} />
                <meshStandardMaterial color="#654321" roughness={0.7} />
            </mesh>

            {/* Basket handle */}
            <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.2, 0.02, 8, 16, Math.PI]} />
                <meshStandardMaterial color="#654321" roughness={0.7} />
            </mesh>

            {/* Food items inside - Bread loaf */}
            <mesh position={[-0.08, 0.25, 0]} castShadow>
                <boxGeometry args={[0.15, 0.08, 0.12]} />
                <meshStandardMaterial color="#D2691E" roughness={0.6} />
            </mesh>

            {/* Apple */}
            <mesh position={[0.08, 0.23, 0.05]} castShadow>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color="#DC143C" roughness={0.3} />
            </mesh>

            {/* Another apple */}
            <mesh position={[0.06, 0.28, -0.05]} castShadow>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color="#FF6347" roughness={0.3} />
            </mesh>

            {/* Grapes cluster effect */}
            <group position={[-0.05, 0.32, 0.08]}>
                <mesh position={[0, 0, 0]} castShadow>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshStandardMaterial color="#9370DB" roughness={0.2} />
                </mesh>
                <mesh position={[0.02, -0.02, 0.01]} castShadow>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshStandardMaterial color="#9370DB" roughness={0.2} />
                </mesh>
                <mesh position={[-0.02, -0.02, 0.01]} castShadow>
                    <sphereGeometry args={[0.03, 8, 8]} />
                    <meshStandardMaterial color="#9370DB" roughness={0.2} />
                </mesh>
            </group>
        </group>
    );
};

export default FoodBasket;
