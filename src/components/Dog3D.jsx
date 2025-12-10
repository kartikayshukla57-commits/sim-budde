import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Dog3D = () => {
    const headRef = useRef();
    const tailRef = useRef();

    useFrame((state) => {
        if (headRef.current) {
            // Head bobbing
            headRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
            headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
        }
        if (tailRef.current) {
            // Tail wagging
            tailRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 15) * 0.6;
        }
    });

    const blackColor = "#1a1a1a";
    const whiteColor = "#f5f5f5";
    const noseColor = "#111";
    const tongueColor = "#FF69B4";

    return (
        <group>
            {/* Body - Sitting Posture */}
            <group position={[0, 0.6, 0]}>
                {/* Main Body */}
                <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
                    <capsuleGeometry args={[0.35, 0.7, 4, 8]} />
                    <meshStandardMaterial color={blackColor} roughness={0.8} />
                </mesh>
                {/* White Chest Patch */}
                <mesh position={[0, 0.1, 0.25]} rotation={[-0.2, 0, 0]} scale={[0.6, 0.6, 0.2]}>
                    <sphereGeometry args={[0.4, 16, 16]} />
                    <meshStandardMaterial color={whiteColor} roughness={0.9} />
                </mesh>
            </group>

            {/* Head Group */}
            <group ref={headRef} position={[0, 1.15, 0.1]}>
                {/* Head */}
                <mesh>
                    <sphereGeometry args={[0.32, 16, 16]} />
                    <meshStandardMaterial color={blackColor} roughness={0.8} />
                </mesh>

                {/* Snout */}
                <mesh position={[0, -0.05, 0.25]}>
                    <boxGeometry args={[0.2, 0.18, 0.25]} />
                    <meshStandardMaterial color={blackColor} roughness={0.8} />
                </mesh>

                {/* Nose */}
                <mesh position={[0, 0.02, 0.38]}>
                    <sphereGeometry args={[0.06, 8, 8]} />
                    <meshStandardMaterial color={noseColor} roughness={0.4} />
                </mesh>

                {/* Tongue - Hanging out */}
                <mesh position={[0, -0.12, 0.3]} rotation={[0.5, 0, 0]}>
                    <boxGeometry args={[0.1, 0.02, 0.2]} />
                    <meshStandardMaterial color={tongueColor} />
                </mesh>

                {/* Eyes */}
                <mesh position={[0.12, 0.1, 0.25]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[0.13, 0.1, 0.29]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="black" />
                </mesh>
                <mesh position={[-0.12, 0.1, 0.25]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial color="white" />
                </mesh>
                <mesh position={[-0.13, 0.1, 0.29]}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial color="black" />
                </mesh>

                {/* Ears - Floppy Spaniel Ears */}
                <mesh position={[0.3, 0, 0]} rotation={[0, 0, -0.3]}>
                    <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
                    <meshStandardMaterial color={blackColor} roughness={0.8} />
                </mesh>
                <mesh position={[-0.3, 0, 0]} rotation={[0, 0, 0.3]}>
                    <capsuleGeometry args={[0.1, 0.6, 4, 8]} />
                    <meshStandardMaterial color={blackColor} roughness={0.8} />
                </mesh>
            </group>

            {/* Front Legs */}
            <mesh position={[0.2, 0.3, 0.25]}>
                <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
                <meshStandardMaterial color={blackColor} roughness={0.8} />
            </mesh>
            <mesh position={[-0.2, 0.3, 0.25]}>
                <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
                <meshStandardMaterial color={blackColor} roughness={0.8} />
            </mesh>

            {/* Back Legs (Sitting) */}
            <mesh position={[0.25, 0.15, -0.1]} rotation={[Math.PI / 2, 0, 0.5]}>
                <capsuleGeometry args={[0.12, 0.4, 4, 8]} />
                <meshStandardMaterial color={blackColor} roughness={0.8} />
            </mesh>
            <mesh position={[-0.25, 0.15, -0.1]} rotation={[Math.PI / 2, 0, -0.5]}>
                <capsuleGeometry args={[0.12, 0.4, 4, 8]} />
                <meshStandardMaterial color={blackColor} roughness={0.8} />
            </mesh>

            {/* Paws */}
            <mesh position={[0.2, 0.05, 0.35]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color={whiteColor} />
            </mesh>
            <mesh position={[-0.2, 0.05, 0.35]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color={whiteColor} />
            </mesh>

            {/* Tail */}
            <group position={[0, 0.2, -0.3]} rotation={[-0.5, 0, 0]}>
                <mesh ref={tailRef} position={[0, 0.2, 0]}>
                    <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
                    <meshStandardMaterial color={blackColor} roughness={0.8} />
                </mesh>
            </group>

        </group>
    );
};

export default Dog3D;
