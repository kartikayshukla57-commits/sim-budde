import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';

const BouquetImage = ({ position, rotation, scale = 1 }) => {
    const ref = useRef();

    useFrame((state) => {
        if (ref.current) {
            // Subtle sway animation for the bouquet
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
        }
    });

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <Image
                ref={ref}
                url="/Subject 2.png"
                transparent
                side={2}
                scale={[1.2, 1.2]}
            />
        </group>
    );
};

export default BouquetImage;
