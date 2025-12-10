import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text, Image } from '@react-three/drei';
import * as THREE from 'three';
import Cake3D from './Cake3D';
import FlowerBouquet from './FlowerBouquet';
import DogImage from './DogImage';
import FloorDecorations from './FloorDecorations';
import FoodBasket from './FoodBasket';

const Frame3D = ({ position, rotation, delay, imageUrl }) => {
    const group = useRef();
    const [targetScale] = useState(1);

    useFrame((state, delta) => {
        if (state.clock.elapsedTime > delay) {
            // Simple lerp for scale
            const step = delta * 5;
            const newScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, step);
            group.current.scale.setScalar(newScale);
        } else {
            group.current.scale.setScalar(0);
        }
    });

    return (
        <group ref={group} position={position} rotation={rotation}>
            {/* Frame Border */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[1.2, 1.8, 0.1]} />
                <meshStandardMaterial color="#B76E79" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Photo Image */}
            {imageUrl && (
                <Image
                    url={imageUrl}
                    position={[0, 0, 0.06]}
                    scale={[1, 1.5]}
                    transparent
                />
            )}
        </group>
    );
};

const Tree = ({ position, scale = 1 }) => {
    return (
        <group position={position} scale={scale}>
            {/* Trunk */}
            <mesh position={[0, 0.75, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.4, 1.5, 8]} />
                <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Leaves */}
            <mesh position={[0, 2, 0]} castShadow>
                <coneGeometry args={[1.5, 2.5, 8]} />
                <meshStandardMaterial color="#4CAF50" />
            </mesh>
            <mesh position={[0, 3, 0]} castShadow>
                <coneGeometry args={[1.2, 2, 8]} />
                <meshStandardMaterial color="#66BB6A" />
            </mesh>
        </group>
    );
};

const PicnicScene = ({ isBlowing = false, candleOut = false }) => {
    const clothRef = useRef();
    const cakeRef = useRef();
    const lavenderRef = useRef();

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;

        // Camera zoom when blowing
        if (isBlowing) {
            // Target position: close to cake, looking at it
            const targetPos = { x: 0, y: 0.6, z: 1.8 };
            const step = delta * 3;
            state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetPos.x, step);
            state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetPos.y, step);
            state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetPos.z, step);
            state.camera.lookAt(0, 0.5, 0);
        }

        // Animate Picnic Cloth
        if (time > 0.5 && clothRef.current) {
            const currentScale = clothRef.current.scale.x;
            const step = delta * 3;
            const newScale = THREE.MathUtils.lerp(currentScale, 1, step);
            clothRef.current.scale.setScalar(newScale);
        } else if (clothRef.current) {
            clothRef.current.scale.setScalar(0);
        }

        // Animate Cake - drops in after cloth
        if (time > 2.0 && cakeRef.current) {
            const currentY = cakeRef.current.position.y;
            const step = delta * 2;
            const newY = THREE.MathUtils.lerp(currentY, 0.05, step);
            cakeRef.current.position.y = newY;
        } else if (cakeRef.current) {
            cakeRef.current.position.y = 5;
        }

        // Animate Lavender
        if (time > 4.5 && lavenderRef.current) {
            const currentS = lavenderRef.current.scale.x;
            const step = delta * 3;
            const newS = THREE.MathUtils.lerp(currentS, 0.6, step);
            lavenderRef.current.scale.setScalar(newS);
        } else if (lavenderRef.current) {
            lavenderRef.current.scale.setScalar(0);
        }
    });

    return (
        <group>
            {/* Ground (Grass) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
                <planeGeometry args={[50, 50]} />
                <meshStandardMaterial color="#7CB342" />
            </mesh>

            {/* Floor Decoration Items */}
            <FloorDecorations />

            {/* Trees - Moved further back */}
            <Tree position={[-7, 0, -5]} scale={1.2} />
            <Tree position={[7, 0, -4]} scale={1.5} />
            <Tree position={[-5, 0, 4]} scale={0.8} />
            <Tree position={[8, 0, 5]} scale={1} />
            <Tree position={[0, 0, -10]} scale={2} />

            {/* Picnic Cloth - Larger [8, 6] */}
            <group ref={clothRef} scale={0}>
                <mesh rotation={[-Math.PI / 2, 0, 10]} position={[0, 0.01, 0]} receiveShadow>
                    <planeGeometry args={[8, 6]} />
                    <meshStandardMaterial color="#F8BBD0" />
                </mesh>

                {/* Checkered Pattern Effect */}
                <gridHelper args={[8, 8, 0xFFFFFF, 0xFFFFFF]} position={[0, 0.02, 0]} rotation={[0, 0.35, 0]} />
            </group>

            {/* Frames: Semi-circle around the cake, Scaled down (0.5) - Appear 3rd (start at 3.5s) */}
            <group scale={0.5}>
                <Frame3D position={[-2.5, 0.5 / 0.5, -1.0]} rotation={[0, 0.5, 0]} delay={3.5} imageUrl="/photos/58835207-2E17-4E93-B29F-7FE817C3051E.JPG" />
                <Frame3D position={[-0.9, 0.5 / 0.5, -1.5]} rotation={[0, 0.2, 0]} delay={3.7} imageUrl="/photos/DSC02374.JPG" />
                <Frame3D position={[0.9, 0.5 / 0.5, -1.5]} rotation={[0, -0.2, 0]} delay={3.9} imageUrl="/photos/PHOTO-2025-04-14-17-45-49.jpg" />
                <Frame3D position={[2.5, 0.5 / 0.5, -1.0]} rotation={[0, -0.5, 0]} delay={4.1} imageUrl="/photos/PHOTO-2025-12-06-12-25-11.jpg" />
            </group>

            {/* Cake - Scaled Down (0.4) */}
            <group ref={cakeRef} position={[0, 5, 0]} scale={0.4}>
                <Cake3D isBlowing={isBlowing} candleOut={candleOut} />
            </group>

            {/* Flower Bouquet in Vase */}
            <group ref={lavenderRef} position={[0.8, 0.15, 0.6]} rotation={[0, -0.3, 0]} scale={0}>
                <FlowerBouquet />
            </group>

            {/* Food Basket - Next to flowers */}
            <Image
                url="/audio/Subject 3.png"
                position={[-0.8, 0.45, 0.6]}
                rotation={[0, 0.5, 0]}
                scale={[0.8, 0.8]}
                transparent
            />

            {/* Dog - Ghibli Style Image */}
            <DogImage position={[-1.5, 0.35, 0.5]} rotation={[0, 0.4, 0]} scale={0.7} />

        </group>
    );
};

export default PicnicScene;
