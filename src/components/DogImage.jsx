import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';

const DogImage = ({ position, rotation, scale = 1 }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            // Subtle breathing - Bobbing reduced for "on the mat" feel
            ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.02;
        }
    });

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <Image
                ref={ref}
                url="/Subject.png"
                transparent
                side={2}
                scale={[1.1, 1.4]}
            />
        </group>
    );
};

export default DogImage;
